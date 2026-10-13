DROP TABLE IF EXISTS order_items, orders, product_variants, products, users CASCADE;

CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,          -- 'iphone-15-pro', used in URLs
  name        TEXT NOT NULL,
  category    TEXT NOT NULL,                 -- 'iphone', 'mac', 'watch'
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE product_variants (
  id          SERIAL PRIMARY KEY,
  product_id  INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  sku         TEXT UNIQUE NOT NULL,
  color_name  TEXT NOT NULL,
  color_hex   TEXT NOT NULL,
  size_label  TEXT NOT NULL,                 -- '6.1"', '14"', etc.
  price_cents INT NOT NULL CHECK (price_cents >= 0),
  stock       INT NOT NULL DEFAULT 0 CHECK (stock >= 0)
);

CREATE TABLE orders (
  id                         SERIAL PRIMARY KEY,
  user_id                    INT REFERENCES users(id),   -- null = guest checkout
  email                      TEXT,                       -- filled in by the Stripe webhook
  status                     TEXT NOT NULL DEFAULT 'pending'
                             CHECK (status IN ('pending','paid','failed','refunded')),
  total_cents                INT NOT NULL,
  currency                   TEXT NOT NULL DEFAULT 'aud',
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_payment_intent_id   TEXT UNIQUE,
  created_at                 TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
  id               SERIAL PRIMARY KEY,
  order_id         INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  variant_id       INT NOT NULL REFERENCES product_variants(id),
  quantity         INT NOT NULL CHECK (quantity > 0),
  unit_price_cents INT NOT NULL              -- price at time of purchase
);