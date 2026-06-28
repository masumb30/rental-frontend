# RentEase 🎬 [Live Demo](https://rental-frontend-26fc.onrender.com/)

**RentEase** is a modern, responsive, and feature-rich Property Rental & Booking Platform. It bridges the gap between property owners looking to list their rentals and tenants seeking a seamless discovery, booking, and online payment experience.

---

## 🚀 Key Features

### 🔹 Public Features
* **Dynamic Landing Page:** Features an interactive hero banner with a comprehensive search/filter bar, featured property showcases, and dynamic tenant reviews.
* **All Properties Page:** High-performance grid layout with advanced backend-driven searching, filtering (by property type), and price sorting (low-to-high / high-to-low).
* **Framer Motion Animations:** Smooth, fluid, and modern entry/staggered transitions applied across the landing page elements to capture recruiter attention.

### 🔹 Tenant Dashboard
* **Property Management:** Detailed property views, custom dynamic booking modal (Move-in date, notes, contact info).
* **Secure Checkout:** Fully integrated **Stripe Payment Gateway** for fast, reliable tokenized transactions.
* **Favorites & Bookings:** Dedicated tables to track favorites (with removal actions) and booking status (`Pending`, `Approved`, `Rejected`).
* **Review System:** Rate and write text reviews directly from the platform.

### 🔹 Owner Dashboard
* **Analytics Hub:** Visual metrics cards tracking total earnings, total listings, and a dynamic **Recharts Line Chart** tracking 12-month historical revenue.
* **Listing Workflow:** Interactive multi-field creation form for new properties (auto-set to `Pending` for admin moderation).
* **Booking Actions:** Dedicated interface to instantly `Approve` or `Reject` prospective tenant requests.
* **Rejection Transparency:** Direct inline access (👁️) to read feedback notes left by administrators on rejected properties.

### 🔹 Admin Dashboard
* **User Moderation:** System-wide table tracking registered users with full RBAC role toggles.
* **Property & Booking Controls:** Approve/Reject pending properties with custom validation feedback modals.
* **Transaction Auditing:** Transparent, sortable accounting tables showing Transaction IDs, parties involved, amounts, and exact dates.

---

## 🛠️ Tech Stack & Packages Used

* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS & DaisyUI
* **Authentication:** Better Auth (with secure JWT patterns and Google Social Sign-In)
* **Animations:** Framer Motion
* **Charts:** Recharts
* **Payment Processing:** `@stripe/stripe-js` & `@stripe/react-stripe-js`
* **Icons:** Lucide React

---

## 📦 Environment Variables Configuration

Create a `.env.local` file in your root folder and set up the following keys:

```env
NEXT_PUBLIC_API_BASE_URL=[https://your-backend-link.onrender.com/api](https://your-backend-link.onrender.com/api)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
BETTER_AUTH_SECRET=your_better_auth_secret
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000