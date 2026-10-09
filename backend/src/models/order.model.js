import { pool } from "../db.js";

export async function findVariantsByIds(ids) {
    const { rows } = await pool.query(
        `SELECT v.id, v.sku, v.color_name, v.size_label, v.price_cents, v.stock, p.name
         FROM product_variants v
         JOIN products p ON p.id = v.product_id
         WHERE v.id = ANY($1::int[])`,
        [ids]
    );
    return rows;
}

// Order + its items in one transaction: all saved, or nothing saved
export async function createPendingOrder({ totalCents, items }) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const { rows } = await client.query(
            `INSERT INTO orders (total_cents, status) VALUES ($1, 'pending') RETURNING id`,
            [totalCents]
        );
        const orderId = rows[0].id;

        for (const item of items) {
            await client.query(
                `INSERT INTO order_items (order_id, variant_id, quantity, unit_price_cents)
                 VALUES ($1, $2, $3, $4)`,
                [orderId, item.variantId, item.quantity, item.unitPriceCents]
            );
        }

        await client.query("COMMIT");
        return orderId;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

export async function setCheckoutSession(orderId, sessionId) {
    await pool.query(
        `UPDATE orders SET stripe_checkout_session_id = $2 WHERE id = $1`,
        [orderId, sessionId]
    );
}

// Idempotent: only a 'pending' order can become 'paid', so a repeated webhook does nothing
export async function markPaid({ orderId, email, paymentIntentId }) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const { rowCount } = await client.query(
            `UPDATE orders
             SET status = 'paid', email = $2, stripe_payment_intent_id = $3
             WHERE id = $1 AND status = 'pending'`,
            [orderId, email, paymentIntentId]
        );

        if (rowCount === 1) {
            await client.query(
                `UPDATE product_variants v
                 SET stock = GREATEST(v.stock - oi.quantity, 0)
                 FROM order_items oi
                 WHERE oi.order_id = $1 AND v.id = oi.variant_id`,
                [orderId]
            );
        }

        await client.query("COMMIT");
        return rowCount === 1;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

const ORDER_DETAILS_QUERY = `
  SELECT o.id, o.status, o.email, o.total_cents AS "totalCents", o.currency,
         o.created_at AS "createdAt",
         json_agg(json_build_object(
           'name', p.name, 'colorName', v.color_name, 'size', v.size_label,
           'quantity', oi.quantity, 'unitPriceCents', oi.unit_price_cents
         ) ORDER BY oi.id) AS items
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  JOIN product_variants v ON v.id = oi.variant_id
  JOIN products p ON p.id = v.product_id
`;

export async function findBySessionId(sessionId) {
    const { rows } = await pool.query(
        `${ORDER_DETAILS_QUERY} WHERE o.stripe_checkout_session_id = $1 GROUP BY o.id`,
        [sessionId]
    );
    return rows[0] ?? null;
}

// Both must match, so nobody can look up someone else's order by guessing a number
export async function findByIdAndEmail(orderId, email) {
    const { rows } = await pool.query(
        `${ORDER_DETAILS_QUERY} WHERE o.id = $1 AND LOWER(o.email) = LOWER($2) GROUP BY o.id`,
        [orderId, email]
    );
    return rows[0] ?? null;
}