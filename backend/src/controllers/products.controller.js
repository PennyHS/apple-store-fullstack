import * as Product from "../models/product.model.js";

export async function listProducts(req, res, next) {
    try {
        const products = await Product.findAll({ category: req.query.category });
        res.json(products);
    } catch (err) {
        next(err);
    }
}

export async function getProductBySlug(req, res, next) {
    try {
        const product = await Product.findBySlug(req.params.slug);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        next(err);
    }
}