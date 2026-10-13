INSERT INTO products (slug, name, category, description) VALUES
  ('iphone-15-pro', 'iPhone 15 Pro', 'iphone', 'Titanium. A17 Pro chip.'),
  ('macbook-pro',   'MacBook Pro',   'mac',    'Built for Apple Intelligence.');

-- iPhone: 4 colours x 2 sizes
INSERT INTO product_variants (product_id, sku, color_name, color_hex, size_label, price_cents, stock)
SELECT p.id, 'IP15P-' || c.code || '-' || s.code, c.name, c.hex, s.label, s.price, 20
FROM products p,
  (VALUES ('NAT','Natural Titanium','#8F8A81'), ('BLU','Blue Titanium','#53596E'),
          ('WHT','White Titanium','#C9C8C2'),   ('BLK','Black Titanium','#454749')) AS c(code,name,hex),
  (VALUES ('61','6.1"',99900), ('67','6.7"',119900)) AS s(code,label,price)
WHERE p.slug = 'iphone-15-pro';

-- MacBook: 2 colours x 2 sizes
INSERT INTO product_variants (product_id, sku, color_name, color_hex, size_label, price_cents, stock)
SELECT p.id, 'MBP-' || c.code || '-' || s.code, c.name, c.hex, s.label, s.price, 10
FROM products p,
  (VALUES ('SB','Space Black','#2e2c2e'), ('SV','Silver','#adb5bd')) AS c(code,name,hex),
  (VALUES ('14','14"',159900), ('16','16"',249900)) AS s(code,label,price)
WHERE p.slug = 'macbook-pro';