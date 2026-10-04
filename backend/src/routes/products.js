import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

const PRODUCT_QUERY = `
  SELECT p.id, p.slug, p.name, p.category, p.description,
         json_agg(json_build_object(
           'id', v.id, 'sku', v.sku, 'colorName', v.color_name, 'colorHex', v.color_hex,
           'size', v.size_label, 'priceCents', v.price_cents, 'inStock', v.stock > 0
         ) ORDER BY v.price_cents, v.id) AS variants
  FROM products p
  JOIN product_variants v ON v.product_id = p.id
`;

// GET /api/products  (optional ?category=iphone)
router.get("/", async (req, res, next) => {
  try {
    const { category } = req.query;
    const { rows } = await pool.query(
      `${PRODUCT_QUERY} ${category ? "WHERE p.category = $1" : ""} GROUP BY p.id ORDER BY p.id`,
      category ? [category] : []
    );
    res.json(rows);
  } catch (err) { next(err); }
});

// GET /api/products/:slug
router.get("/:slug", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `${PRODUCT_QUERY} WHERE p.slug = $1 GROUP BY p.id`,
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: "Product not found" });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

export default router;