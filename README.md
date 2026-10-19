# DK Dance Company (DKDC)

> **Website:** [www.dkdancecompany.com](https://www.dkdancecompany.com)  
> **Artistic Director:** Dhanesh Krishnan  
> **Head Office:** Kozhikode, Kerala, India  
> **International Branch:** Bournemouth, United Kingdom  
> **Tagline:** Learn • Train • Perform • Grow

---

## Overview

DK Dance Company (DKDC) is a premier contemporary and commercial dance training institution offering progressive dance education for children, teenagers, and adults. Founded by Director Dhanesh Krishnan, the company operates physical studios across Kozhikode, Kerala, an international branch studio in Bournemouth, UK, and interactive digital classes worldwide.

This repository is a production-grade, full-stack Next.js web application engineered with an editorial, high-fashion contemporary dance aesthetic, database-driven CMS, UploadThing media infrastructure, and an administrative control panel.

---

## Visual & Brand Identity

- **Dominant UI Palette:** Black (`#000000`) and White (`#FFFFFF`)
- **Brand Accents:** DK Yellow (`#FFF102`) and DK Red (`#EE1D23`)
- **Typography:** Syne (editorial headlines) & Plus Jakarta Sans (clean, legible body copy)
- **Design Philosophy:** Minimalist, editorial, cultural, energetic, and international. Whitespace is used aggressively, layouts breathe, and micro-interactions elevate kinetic movement without visual clutter.

---

## Tech Stack & Architecture

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Vanilla CSS tokens
- **Animations:** Framer Motion (respects `prefers-reduced-motion`)
- **Database:** MongoDB Atlas (official `mongodb` driver with pooled caching)
- **Media Uploads:** UploadThing (`uploadthing` & `@uploadthing/react`)
- **Authentication:** HTTP-only secure cookie session with signed JWT (`jose`) and rate limiting
- **Architecture:** Unified Single Codebase (Server Components, Client Components, and Next.js Route Handlers)

---

## Table of Contents

1. [Installation](#1-installation)
2. [Environment Setup](#2-environment-setup)
3. [MongoDB Atlas Setup](#3-mongodb-atlas-setup)
4. [UploadThing Setup](#4-uploadthing-setup)
5. [Local Development](#5-local-development)
6. [Production Build](#6-production-build)
7. [Admin Configuration](#7-admin-configuration)
8. [Database Initialization & Seeding](#8-database-initialization--seeding)
9. [Deployment Instructions](#9-deployment-instructions)
10. [How to Manage Branches](#10-how-to-manage-branches)
11. [How to Manage Gallery & Media](#11-how-to-manage-gallery--media)
12. [How to Update Site Content & Settings](#12-how-to-update-site-content--settings)

---

## 1. Installation

Clone the repository and install project dependencies using Node.js v18.17+ or v20+:

```bash
# Clone the repository
git clone https://github.com/your-org/dk-dance-company.git
cd dk-dance-company

# Install dependencies
npm install
```

---

## 2. Environment Setup

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

### Environment Variables Reference

| Variable | Description | Client Visible |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas cluster connection string | No (Server only) |
| `MONGODB_DB_NAME` | Database name (e.g. `dkdancecompany`) | No (Server only) |
| `UPLOADTHING_TOKEN` | UploadThing app token | No (Server only) |
| `UPLOADTHING_SECRET` | UploadThing app secret | No (Server only) |
| `ADMIN_USERNAME` | Master administrator username | No (Server only) |
| `ADMIN_PASSWORD` | Master administrator password | No (Server only) |
| `ADMIN_JWT_SECRET` | 32+ character random secret for JWT signing | No (Server only) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://www.dkdancecompany.com`) | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp contact digits without `+` (e.g. `919995272083`) | Yes |
| `NEXT_PUBLIC_CONTACT_PHONE` | Formatted contact phone number (e.g. `+91 9995 272 083`) | Yes |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Official contact email (e.g. `info@dkdancecompany.com`) | Yes |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram page link | Yes |
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook page link | Yes |
| `NEXT_PUBLIC_YOUTUBE_URL` | YouTube channel link | Yes |

---

## 3. MongoDB Atlas Setup

1. Create a free or dedicated cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Database Access**, create a database user with read and write privileges.
3. Under **Network Access**, whitelist your deployment IP addresses (or `0.0.0.0/0` for Vercel/cloud serverless environments).
4. Click **Connect** -> **Drivers** -> **Node.js** to obtain your connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DB_NAME=dkdancecompany
   ```
5. When `MONGODB_URI` is provided, the application connects via pooled connection caching. If running offline without MongoDB configured, the application automatically uses in-memory data fallbacks so development and UI testing never crash.

---

## 4. UploadThing Setup

1. Create a free account at [UploadThing](https://uploadthing.com).
2. Create a new app (e.g., `dkdancecompany`).
3. Under API Keys, copy your **API Key** or **UploadThing Token**.
4. Set the value in `.env.local`:
   ```env
   UPLOADTHING_TOKEN=your_uploadthing_token_here
   ```
5. Upload limits configured in `src/app/api/uploadthing/core.ts`:
   - **Photos (`imageUploader`):** Max 8MB per file, up to 4 files simultaneously.
   - **Videos (`videoUploader`):** Max 64MB per file.
   - Only authenticated admin sessions can upload or delete assets.

---

## 5. Local Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Production Build

To test and compile an optimized production build:

```bash
npm run build
npm run start
```

All 30+ static and dynamic routes will be statically generated and optimized.

---

## 7. Admin Configuration

- **Login Route:** `/admin/login`
- **Dashboard Route:** `/admin`
- **Default Dev Credentials:**
  - Configured in your private `.env.local` via `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
- **Security:**
  - Login attempts are rate-limited per IP.
  - Authentication is stored in an HTTP-only, `SameSite=lax` cookie named `dkdc_session`.
  - Credentials are never stored in client bundles or exposed through API endpoints.

---

## 8. Database Initialization & Seeding

The application includes an idempotent seed mechanism that populates the database with:
- Initial confirmed studio branches (Kunduparamba, Westhill, Balussery, Kottooli, Parambilbazar, Bournemouth UK).
- Official site settings, tuition fee structure, mission, and vision.
- Curated initial gallery items.

To trigger seeding manually:
```bash
curl -X POST http://localhost:3000/api/seed
```
*Note: Seeding is safe and idempotent; it will not duplicate or overwrite existing records.*

---

## 9. Deployment Instructions

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Framework Preset to **Next.js**.
4. Add all environment variables from `.env.example` in the Vercel Dashboard (**Project Settings > Environment Variables**).
5. Click **Deploy**.

---

## 10. How to Manage Branches

1. Log into `/admin` and navigate to **Branches**.
2. Click **Add New Branch** to create a branch with:
   - Branch Name & URL Slug
   - City, State, Country
   - Physical Address
   - Google Maps Location URL (verified maps link)
   - Contact Phone & WhatsApp digits
   - Studio Image URL
   - Class Timings & Batch Schedules
   - Active status toggle & Display Order
3. Edit existing branches or click the delete button with interactive confirmation.
4. Changes appear on the public `/branches` and individual `/branches/[slug]` pages immediately.

---

## 11. How to Manage Gallery & Media

1. Log into `/admin` and navigate to **Media Library**.
2. Filter media by category (Classes, Performances, Stage Shows, Competitions, Workshops, Bournemouth, etc.).
3. Upload new images or videos directly using the UploadThing button, or paste an existing CDN link.
4. Set title, category, description, and display order.
5. Use the **Live / Draft** toggle to publish or unpublish items.
6. When deleting an item, the admin confirms via a modal, which removes the database record and calls UploadThing `UTApi` to delete the stored cloud asset.

---

## 12. How to Update Site Content & Settings

1. Log into `/admin` and navigate to **Site Settings**.
2. Update:
   - Homepage intro statement
   - Mission and Vision statements
   - One-time admission fee and monthly 1-class / 2-class fees
   - Fee payment policy note
   - Online classes description and curriculum features
   - Head office phone, email, and WhatsApp numbers
   - Social media links (Instagram, Facebook, YouTube, TikTok)
3. Click **Publish Updated Settings**.

---

## Directory Structure

```
├── public/
│   └── images/
│       └── logo/
│           └── logo.png              # Official DK Dance Company Logo
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Cinematic Homepage
│   │   ├── about/page.tsx            # About DKDC & Director Dhanesh Krishnan
│   │   ├── dance-styles/page.tsx     # 01-06 Styles & Conditioning Curriculum
│   │   ├── classes/page.tsx          # Classes & Fee Structure
│   │   ├── branches/
│   │   │   ├── page.tsx              # Branches Directory
│   │   │   └── [slug]/page.tsx       # Individual Branch Studio Pages
│   │   ├── online-classes/page.tsx   # Global Digital Masterclasses
│   │   ├── gallery/page.tsx          # Database-driven Gallery & Lightbox
│   │   ├── rules/page.tsx            # Institutional Rules & Policies
│   │   ├── contact/page.tsx          # Contact & Admission Enquiry Form
│   │   ├── privacy/page.tsx          # Privacy Policy
│   │   ├── terms/page.tsx            # Terms & Conditions
│   │   ├── sitemap.ts                # Dynamic SEO Sitemap
│   │   ├── robots.ts                 # Robots.txt Configuration
│   │   ├── not-found.tsx             # Custom 404
│   │   ├── error.tsx                 # Error Boundary
│   │   ├── loading.tsx               # Editorial Suspense Loader
│   │   ├── admin/
│   │   │   ├── login/page.tsx        # Secure Minimal Login Portal
│   │   │   ├── page.tsx              # Admin Metrics & Enquiries Dashboard
│   │   │   ├── media/page.tsx        # UploadThing Media Library CRUD
│   │   │   ├── branches/page.tsx     # Branch Studio CRUD
│   │   │   ├── enquiries/page.tsx    # Admission Leads Manager
│   │   │   └── settings/page.tsx     # Dynamic Content & Settings CMS
│   │   └── api/
│   │       ├── auth/                 # Login, Logout, Session Verification
│   │       ├── branches/             # Branch CRUD APIs
│   │       ├── media/                # Media CRUD & UTApi File Deletion
│   │       ├── enquiries/            # Validated Submission & Lead APIs
│   │       ├── settings/             # Dynamic Site Settings APIs
│   │       ├── seed/                 # Idempotent Database Seed Route
│   │       └── uploadthing/          # FileRouter Endpoint
│   ├── components/
│   │   ├── layout/                   # Navbar, Footer
│   │   ├── sections/                 # Hero, Intro, Styles, Fees, Branches, Online, CTA
│   │   ├── gallery/                  # GalleryGrid, Lightbox, VideoModal
│   │   ├── forms/                    # Validated Contact & Enquiry Form
│   │   ├── admin/                    # Sidebar, Header, ConfirmDialog
│   │   └── ui/                       # Button, Motion, Modal, WhatsAppButton
│   ├── lib/
│   │   ├── auth.ts                   # JWT & HTTP-Only Session Auth
│   │   ├── constants.ts              # Confirmed Branches, Styles, Defaults
│   │   ├── db-services.ts            # Database Service Layer (MongoDB + Fallbacks)
│   │   ├── mongodb.ts                # Cached MongoDB Connection Pool
│   │   ├── uploadthing.ts            # UploadThing Client & UTApi Deletion Helper
│   │   └── utils.ts                  # Class merge, WhatsApp Link Helper, Dates
│   └── types/
│       └── index.ts                  # TypeScript Interfaces
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## License

© 2026 DK Dance Company (DKDC). All rights reserved.
Artistic Director: Dhanesh Krishnan.
