# SuperMouth — Next.js Headless Frontend

A modern headless e-commerce site for SuperMouth, built with Next.js 14, Shopify Storefront API, Tailwind CSS, and Qunicer AI agents.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **E-commerce:** Shopify Storefront API (headless)
- **AI Agent:** Qunicer
- **Deployment:** Vercel

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/supermouth-nextjs.git
cd supermouth-nextjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=fn75n7-94.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
NEXT_PUBLIC_QUNICER_API_KEY=your_qunicer_key
NEXT_PUBLIC_QUNICER_AGENT_ID=your_agent_id
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploying to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Add environment variables in Vercel dashboard (Settings → Environment Variables)
5. Deploy!

## Project Structure

```
app/                    # Next.js App Router pages
components/             # Reusable UI components
  Navbar.tsx            # Sticky nav with dropdowns
  Footer.tsx            # Full footer with links
  CartDrawer.tsx        # Slide-in cart
  ProductCard.tsx       # Product grid card
  QunicerAgent.tsx      # AI agent integration
lib/
  shopify.ts            # Shopify Storefront API client
  cart-context.tsx      # Global cart state
```

## Pages

| Route | Description |
|---|---|
| `/` | Homepage |
| `/shop-all` | All products |
| `/systems-overview` | Age-based systems |
| `/supermouth-bundles` | Bundle deals |
| `/collections/[handle]` | Collection pages |
| `/products/[handle]` | Product detail pages |
| `/our-story` | Brand story |
| `/what-makes-us-super` | S.U.P.E.R. framework |
| `/learn` | Articles & guides |
| `/faqs` | FAQ page |
| `/contact` | Contact page |

## Qunicer Integration

Add your Qunicer API key and Agent ID to `.env.local`. The agent loads automatically via the `QunicerAgent` component in the root layout.
