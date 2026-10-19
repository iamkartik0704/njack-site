# NJACK — The Official Computer Science Club of IIT Patna

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

> **NJACK (Not Just Another Computer Club)** is the premier student-led computer science club of IIT Patna. We foster an ecosystem of algorithmic problem solving, modern web/app development, systems & cybersecurity engineering, and cutting-edge artificial intelligence research.

---

## 🌟 Key Features

- **Department Portals**: Dedicated portals for Competitive Programming (CP), Web & App Development (Dev & OS), Cybersecurity, and Artificial Intelligence & Machine Learning (AI/ML).
- **Curated Learning Tracks & Resources**: Structured step-by-step tracks with categorized roadmaps, recommended documentation, and interactive quizzes.
- **Interactive Quizzes**: Real-time evaluation with explanations, score breakdowns, and departmental leaderboards.
- **Flagship Events & Hackathons**:
  - **Apeireon**: NJACK's annual flagship coding & hackathon extravaganza.
  - **NWoC (NJACK Winter of Code)**: The premier winter open-source initiative connecting student mentors and contributors worldwide.
- **Project Showcase & Engineering Blog**: Highlighting open-source projects, research publications, technical tutorials, and post-mortems from IIT Patna engineers.
- **Club Achievements**: Tracking ICPC World Finals appearances, GSoC selections, capture-the-flag victories, and global hackathon wins.
- **Admin Dashboard**: Full CRUD management for events, resources, tracks, quizzes, blogs, projects, team members, and submission moderation.
- **Academic Integrity Reporting**: Dedicated portal for anonymous reporting of contest cheating and plagiarism.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, Server & Client Components, Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism and animated effects
- **Motion & Graphics**: Framer Motion, GSAP, Canvas Confetti, and custom Lucide React icons
- **Database & ORM**: SQLite (self-contained local development) / PostgreSQL (production-ready) with Prisma ORM
- **Authentication**: JWT token-based authentication with bcrypt password hashing

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have **Node.js 18+** installed:
```bash
node -v
npm -v
```

### 2. Clone the Repository
```bash
git clone https://github.com/iamkartik0704/njack-site.git
cd njack-site
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default configuration:
```env
DATABASE_URL="file:./dev.db"
ADMIN_JWT_SECRET="njack_iit_patna_super_admin_secret_key_2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 5. Setup & Seed Database
Run the unified setup command to push the schema and seed initial club data:
```bash
npm run db:setup
```

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Access

Access the Admin Dashboard at: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

- **Email**: `admin@njack.iitp.ac.in`
- **Password**: `admin123`

---

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma       # Database models & relationships
│   └── seed.js             # Comprehensive database seed script
├── public/                 # Static assets and club logos
├── src/
│   ├── app/                # Next.js App Router pages and API routes
│   │   ├── about/          # About NJACK & IIT Patna
│   │   ├── achievements/   # Club accomplishments
│   │   ├── admin/          # Admin dashboard & management tools
│   │   ├── apeireon/       # Apeireon flagship event
│   │   ├── api/            # REST API route handlers
│   │   ├── blog/           # Technical engineering blog
│   │   ├── contact/        # Contact form & inquiries
│   │   ├── departments/    # CP, Dev/OS, Cyber, AI/ML portals
│   │   ├── events/         # Upcoming & past events
│   │   ├── gallery/        # Photo gallery & memory wall
│   │   ├── nwoc/           # NJACK Winter of Code portal
│   │   ├── projects/       # Club open-source projects
│   │   ├── quizzes/        # Interactive technical quizzes
│   │   ├── report-cheating/# Cheating & plagiarism report portal
│   │   ├── resources/      # Curated tracks and tutorials
│   │   └── team/           # Office bearers & team directory
│   ├── components/         # Reusable UI components & animations
│   └── lib/                # Database client, auth helpers, utilities
└── package.json
```

---

## 🤝 Contributing

Contributions are always welcome! Feel free to open an issue or submit a pull request.

---

## 👤 Author

Developed and maintained with ❤️ by **[iamkartik0704](https://github.com/iamkartik0704)** (Kartik Chawla) for **NJACK, IIT Patna**.
