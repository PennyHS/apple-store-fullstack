# Apple Store Demo — Full-Stack E-commerce

A routed Apple-style storefront: 3D MacBook and iPhone product pages, backed by a REST API, SQL database and Stripe/PayPal checkout, deployed to AWS and Azure.

## Structure

| Folder | What's in it |
|---|---|
| `frontend/` | React 19 + Vite + Tailwind 4 + GSAP + React Three Fiber. Routes: `/iphone` (home), `/macbook` |
| `backend/` | Node/Express API — products, cart, orders, payments + webhooks *(to do)* |
| `database/` | SQL schema and seed data *(to do)* |
| `originals/` | The two original tutorial projects, kept untouched for reference |

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

## Roadmap

- [x] Combined frontend with routing (`/macbook` working)
- [x] iPhone page moved into `frontend/` (React 18→19, Tailwind 3→4, R3F 8→9), Mac/iPhone nav links route between pages
- [ ] Shared navbar + footer
- [ ] Backend API
- [ ] SQL schema + seed data
- [ ] Stripe / PayPal checkout with webhooks
- [ ] Deploy to AWS and Azure

## Credits

The MacBook and iPhone landing pages started from JavaScript Mastery tutorials
([MacBook](https://youtu.be/DEeaT6FxEws), [iPhone](https://youtu.be/kRQbRAJ4-Fs)).
The combined storefront, backend, database, payments and deployment are my own work.
