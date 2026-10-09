import express from "express";
import cors from "cors";
import "dotenv/config";
import productsRouter from "./routes/products.routes.js";
import checkoutRouter from "./routes/checkout.routes.js";
import { stripeWebhook } from "./controllers/checkout.controller.js";
import ordersRouter from "./routes/orders.routes.js";


const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
// Stripe needs the RAW body to verify the signature, so this must come BEFORE express.json()
app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), stripeWebhook);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/products", productsRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", ordersRouter);

// Basic error handler: logs the real error, hides details from the client
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));