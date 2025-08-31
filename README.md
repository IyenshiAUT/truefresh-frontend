# TrueFresh — Frontend

This repository contains the frontend for TrueFresh, a small e-commerce React application (product listing, cart, checkout, and authentication).

Key features
- Browse products and view product cards
- Add/remove items to a cart and view cart panel
- Authentication (login/register) with token-based auth stored in localStorage
- Checkout flow and cart persistence via context

Tech stack
- React 19 (Create React App)
- Tailwind CSS + PostCSS
- Axios for API requests
- React Router for navigation
- Headless UI & Heroicons for UI primitives
- react-hot-toast for notifications

Quick start

Prerequisites
- Node.js (LTS recommended)
- npm (comes with Node.js)

Install dependencies

```powershell
npm install
```

Run development server

```powershell
npm start
```

Build for production

```powershell
npm run build
```

Where to configure the backend API

API calls are made with Axios from `src/api/axiosConfig.js`. By default the file sets:

```
baseURL: 'http://localhost:8080/api'
```

If your backend runs elsewhere, update the `baseURL` in that file or replace it with an environment variable. The Axios instance also attaches an `Authorization: Bearer <token>` header when `localStorage.accessToken` exists.

Project structure (important files)
- `src/` — main source
	- `src/api/axiosConfig.js` — axios instance and auth interceptor
	- `src/components/Products/ProductCard.js` — product card UI
	- `src/components/Cart/CartPanel.js` — cart UI
	- `src/contexts/` — `AuthContext.js`, `CartContext.js`
	- `src/pages/` — `HomePage.js`, `ProductsPage.js`, `CartPage.js`, `CheckoutPage.js`, `LoginPage.js`, `RegisterPage.js`

Scripts
- `npm start` — start dev server
- `npm run build` — production build
- `npm test` — run test runner
- `npm run eject` — eject CRA (one-way)

Tips & notes
- Auth token key: `accessToken` in localStorage. The frontend expects a JWT-like token and sends it as `Authorization: Bearer <token>`.
- When changing the API URL, prefer using an env var (for example `REACT_APP_API_URL`) and read it inside `src/api/axiosConfig.js`.

Quick tip: "Shop Now" scroll behavior

The homepage includes a "Shop Now" action that scrolls smoothly to the "Browse Our Categories" section. That section uses the id `browse-categories`. If you want to change where the button scrolls, update the id in `src/pages/HomePage.js` and any link that points to `/#browse-categories`.

Contributing
- Open an issue or submit a pull request. Keep changes small and focused. Add tests for new features where possible.

License
- This project doesn't include a license file; add one if you plan to open-source it.
