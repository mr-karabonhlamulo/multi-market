# 🌿 Multi-Market — Partner Commerce Platform

A full-stack MLM (Multi-Level Marketing) e-commerce platform built for health and lifestyle products. The platform supports a **membership-first onboarding model**, where users must register or log in before accessing the shop. Partners earn commissions through a referral network and can manage their business via a dedicated dashboard.

---

## 📦 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** + **TypeScript** | Component-based UI |
| **React Router v6** | Client-side routing with protected routes |
| **Vite** | Lightning-fast dev server & bundler |
| **Tailwind CSS v3** | Utility-first styling |
| **Three.js** + **@react-three/fiber** | Animated 3D background |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Hono** | Lightweight REST API framework |
| **Node.js** + **tsx** | TypeScript runtime for the server |
| **better-sqlite3** | Local SQLite database (development) |
| **Supabase** | Cloud Postgres database (production-ready, optional) |

---

## 🗂️ Project Structure

```
multi-market/
├── src/                        # Frontend (React + TypeScript)
│   ├── components/             # Shared layout & UI components
│   │   ├── Background3D.tsx    # Three.js animated background
│   │   ├── BannerSlider.tsx    # Auto-rotating hero banner
│   │   ├── DashboardLayout.tsx # Partner dashboard sidebar layout
│   │   ├── MainLayout.tsx      # Public-facing site layout (nav + footer)
│   │   └── StaticBanner.tsx    # Static promotional banner
│   ├── contexts/               # React Context providers
│   │   ├── AuthContext.tsx     # Authentication state & login/logout logic
│   │   ├── CartContext.tsx     # Shopping cart state management
│   │   └── ThemeContext.tsx    # Theme toggle (Royal Dark / Nude Light)
│   ├── data/
│   │   └── products.ts         # Static fallback product data
│   ├── pages/                  # Route-level page components
│   │   ├── LandingPage.tsx     # Homepage with new arrivals & banners
│   │   ├── ShopPage.tsx        # Full product catalogue
│   │   ├── ProductDetailPage.tsx # Individual product page
│   │   ├── CartPage.tsx        # Shopping cart
│   │   ├── CheckoutPage.tsx    # Order checkout flow
│   │   ├── LoginPage.tsx       # Authentication: login
│   │   ├── RegisterPage.tsx    # Authentication: register with referral code
│   │   ├── PartnerDashboard.tsx # Partner home dashboard (stats & summary)
│   │   ├── AboutPage.tsx       # About the brand
│   │   ├── ContactPage.tsx     # Contact form
│   │   └── GenericPage.tsx     # Placeholder for upcoming features
│   ├── App.tsx                 # Root component: routing & providers
│   └── main.tsx                # React entry point
│
├── backend/                    # Backend (Hono + SQLite)
│   ├── src/
│   │   ├── app.ts              # Hono app setup (middleware, routes)
│   │   ├── index.ts            # HTTP server entry point (port 3000)
│   │   ├── db/
│   │   │   ├── sqlite.ts       # SQLite setup, schema init & seed data
│   │   │   └── db.ts           # Supabase client (production alternative)
│   │   ├── routes/
│   │   │   ├── auth.ts         # POST /api/auth/register, /api/auth/login
│   │   │   ├── products.ts     # GET /api/products, /api/products/:id
│   │   │   └── orders.ts       # POST /api/orders (with commission logic)
│   │   └── services/
│   │       └── commission.ts   # Commission calculation & distribution logic
│   ├── schema.sql              # Full production SQL schema (Supabase)
│   └── package.json
│
├── public/                     # Static assets (images, media)
├── .env.example                # Environment variable template
├── vite.config.ts              # Vite config with API proxy
├── tailwind.config.js          # Custom design tokens & brand colours
├── tsconfig.json               # TypeScript config
└── package.json                # Root scripts & dependencies
```

---

## 🗄️ Database Schema

The platform uses **SQLite** locally (auto-initialised on first run) and is designed to migrate to **Supabase (Postgres)** in production.

### Tables

#### `users`
| Column | Type | Description |
|---|---|---|
| `id` | TEXT (PK) | Unique user identifier |
| `email` | TEXT | Unique email address |
| `password` | TEXT | Plaintext (⚠️ to be hashed in production) |
| `full_name` | TEXT | Display name |
| `referrer_id` | TEXT | FK → `users.id` (MLM upline reference) |
| `role` | TEXT | `admin`, `partner`, or `customer` |
| `rank` | TEXT | `bronze`, `silver`, `gold`, `platinum` |
| `wallet_balance` | REAL | Partner commission wallet |
| `team_size` | INTEGER | Total downline recruits |

#### `products`
| Column | Type | Description |
|---|---|---|
| `id` | TEXT (PK) | Product identifier |
| `name` | TEXT | Product name |
| `description` | TEXT | Product description |
| `retail_price` | REAL | Price for customers |
| `wholesale_price` | REAL | Discounted price for partners |
| `moq` | INTEGER | Minimum Order Quantity for wholesale |
| `category` | TEXT | e.g. `fragrances` |
| `image_url` | TEXT | Product image path or URL |

#### `orders`
| Column | Type | Description |
|---|---|---|
| `id` | TEXT (PK) | Order identifier |
| `user_id` | TEXT | FK → `users.id` |
| `status` | TEXT | `pending`, `paid`, `shipped`, `delivered` |
| `total_amount` | REAL | Order total |
| `created_at` | DATETIME | Timestamp |

#### `commissions`
| Column | Type | Description |
|---|---|---|
| `id` | INTEGER (PK) | Auto-incremented |
| `partner_id` | TEXT | FK → `users.id` (earner) |
| `order_id` | TEXT | FK → `orders.id` (source order) |
| `amount` | REAL | Commission earned |
| `status` | TEXT | `pending` or `paid` |
| `created_at` | DATETIME | Timestamp |

---

## 🔌 API Endpoints

All API routes are served under `/api` (proxied from Vite's dev server to `localhost:3000`).

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/` | API health check |
| `POST` | `/api/auth/register` | Register a new user (with optional `referrer_id`) |
| `POST` | `/api/auth/login` | Log in and receive a session token |
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/:id` | Get a single product by ID |
| `POST` | `/api/orders` | Create an order (applies partner pricing & MOQ checks) |

---

## 🛣️ Frontend Routes

### Public Routes
| Path | Page |
|---|---|
| `/` | Landing Page (new arrivals, banners) |
| `/shop` | Product catalogue |
| `/product/:id` | Product detail view |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/login` | Login |
| `/register` | Register (with referral code support) |
| `/about` | About page |
| `/contact` | Contact page |
| `/faq` | FAQ (placeholder) |
| `/terms` | Terms & Conditions (placeholder) |

### Protected Partner Routes (requires login)
| Path | Page |
|---|---|
| `/partner` | Partner Dashboard |
| `/partner/portfolio/buy-items` | Buy Items |
| `/partner/portfolio/orders` | View Orders |
| `/partner/portfolio/payslips` | View Payslips |
| `/partner/portfolio/vouchers` | Discount Vouchers |
| `/partner/portfolio/travel` | Travel Promotions |
| `/partner/portfolio/promotions` | Company Promotions |
| `/partner/network/gen1` | Gen 1 Strategy |
| `/partner/network/gen2` | Gen 2 Strategy |
| `/partner/network/gen-n` | Gen Nth Strategy |
| `/partner/office/commissions` | Team Commissions |
| `/partner/office/rankings` | Team Rankings |
| `/partner/office/sales` | Team Sales |
| `/partner/office/recruitment` | Team Recruitment |
| `/partner/account/profile` | Profile Maintenance |
| `/partner/account/banking` | Banking Maintenance |
| `/partner/account/terms` | T&C's Maintenance |

---

## 🎨 Design System

The platform uses a custom Tailwind theme with two switchable modes:

### Royal Dark Mode (Default)
- Background: Deep teal-green (`#022c22`)
- Accent: Emerald green glow (`#10b981`)
- Typography: White / translucent white
- Style: Glassmorphism, dark luxury

### Nude Light Mode
- Background: Warm bone / stone tones
- Typography: Warm dark (`#44403c`)
- Style: Clean, minimalist

**Fonts:**
- **Inter** — body copy and UI elements
- **Playfair Display** — headings and serif accents

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1. Clone and Install

```bash
git clone <repo-url>
cd multi-market
npm install
cd backend && npm install && cd ..
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Optional: Supabase (leave blank to use local SQLite)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Optional: base URL override
VITE_BASE_URL=/
```

### 3. Run the Development Server

```bash
npm run dev
```

This concurrently starts:
- **Vite** frontend on `http://localhost:5173`
- **Hono** backend on `http://localhost:3000`

The Vite dev server automatically proxies `/api` requests to the backend.

---

## 🔐 Demo Credentials

These accounts are seeded automatically on first run:

| Role | Email | Password |
|---|---|---|
| Partner | `partner@perfumeco.online` | `password123` |
| Customer | `customer@gmail.com` | `password123` |

> ⚠️ **Warning:** Passwords are stored in plaintext. This is for development only — implement bcrypt hashing before going to production.

---

## 🏗️ Build & Deploy

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` folder.

### Backend Only

```bash
npm run start:backend
```

### Deploy to Render (or similar PaaS)
- **Frontend**: Deploy `dist/` as a static site.
- **Backend**: Deploy `backend/` as a Node.js web service, setting `NODE_ENV=production`.
  - In production, the database defaults to `/tmp/database.sqlite` or Supabase (if configured).

---

## 🔮 Planned Features

- [ ] JWT / bcrypt-based secure authentication
- [ ] Full MLM commission tree (multi-generational)
- [ ] Partner rank progression logic
- [ ] Payment gateway integration
- [ ] Admin panel for product & user management
- [ ] Supabase Row-Level Security (RLS) policies
- [ ] Mobile-responsive partner dashboard
- [ ] Email notifications for commissions & orders

---

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.