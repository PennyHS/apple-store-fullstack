import { pool } from "../db.js";

const BASE_QUERY = `
  SELECT p.id, p.slug, p.name, p.category, p.description,
         json_agg(json_build_object(
           'id', v.id, 'sku', v.sku, 'colorName', v.color_name, 'colorHex', v.color_hex,
           'size', v.size_label, 'priceCents', v.price_cents, 'inStock', v.stock > 0
         ) ORDER BY v.price_cents, v.id) AS variants
  FROM products p
  JOIN product_variants v ON v.product_id = p.id
`;

export async function findAll({ category } = {}) {
    const { rows } = await pool.query(
        `${BASE_QUERY} ${category ? "WHERE p.category = $1" : ""} GROUP BY p.id ORDER BY p.id`,
        category ? [category] : []
    );
    return rows;
}

export async function findBySlug(slug) {
    const { rows } = await pool.query(
        `${BASE_QUERY} WHERE p.slug = $1 GROUP BY p.id`,
        [slug]
    );
    return rows[0] ?? null;
}