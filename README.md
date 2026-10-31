# NJACK — The Official Computer Science Club of IIT Patna

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql)](https://neon.tech/)

> **NJACK (Not Just Another Computer Science Club)** is the official computer science club of Indian Institute of Technology Patna. We build an ecosystem of algorithmic problem solving, production cloud systems, cybersecurity exploitation & defense, and artificial intelligence research.

---

## 🌟 Key Highlights & Features

- **Four Specialized Technical Divisions**:
  - `01` **Competitive Programming (CP)**: Algorithms, Data Structures, ICPC training ladder, and weekly virtual contest sessions.
  - `02` **Development & Open Source (DevOS)**: Full-stack modern web, systems programming, cloud native DevOps, and NWoC open-source mentorship.
  - `03` **Machine Learning (AI-ML)**: Neural architectures, LLMs, computer vision, PyTorch research paper reading, and Kaggle competitions.
  - `04` **Cybersecurity (CSEC)**: Binary exploitation, reverse engineering, cryptography, web security, and national CTF challenges.
- **Interactive 3D WebGL Centerpiece**: Built with Three.js & React Three Fiber featuring the official folded-ribbon hexagonal NJACK emblem, floating mechanical keycaps, and spatial particle physics.
- **Division Handbooks & Curriculum**: Deep-dive syllabus, recommended tools, and structured roadmaps for each division.
- **Resource Catalog**: Filterable library of notes, repositories, deep-dive articles, and videos across all technical disciplines.
- **Interactive Quizzes**: Client-side pedagogical diagnostic checks with instant answer verification and algorithmic explanations.
- **Council Admin Portal**: Restricted management dashboard for council coordinators to manage events, quizzes, resources, submissions, and team rosters.
- **Confidential Academic Integrity Portal**: Anonymous reporting system for contest plagiarism and coordinate cheating.
- **High-Performance Architecture**: 100% responsive across mobile, tablet, and desktop viewports with Lenis inertial smooth scroll and zero horizontal overflow.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Obsidian Dark Theme, Glassmorphism & Micro-Interactions)
- **3D & Canvas Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **Database & ORM**: [Neon Serverless PostgreSQL](https://neon.tech/) / SQLite with [Prisma ORM](https://www.prisma.io/)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v18.17` or higher (`v20.x` recommended)
- **npm**: `v9.x` or higher

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
Create a `.env` file in the project root:

```env
# Database connection string (PostgreSQL for Neon / production or SQLite for local dev)
DATABASE_URL="postgresql://username:password@ep-sample.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

# Admin JWT secret key for session signing
ADMIN_JWT_SECRET="njack_iit_patna_super_admin_secret_key_2026"

# Application public base URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 5. Setup & Seed the Database
Push the Prisma schema and seed initial club departments, quizzes, resources, events, and leadership rosters:

```bash
npm run db:setup
```

*(This runs `prisma db push` followed by `node prisma/seed.js`)*.

### 6. Run the Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Council Admin Portal

Access the restricted council portal at: `/admin` (or `/admin/login`).

> **Note**: Council authentication credentials are restricted to authorized NJACK lead coordinators and are provisioned privately via your database seed configuration.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server at `localhost:3000` |
| `npm run build` | Compiles and generates the optimized production build |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint type and syntax checks |
| `npm run db:push` | Pushes the Prisma schema to the configured database |
| `npm run db:seed` | Populates the database with default seed data |
| `npm run db:setup` | Executes `db:push` and `db:seed` in sequence |

---

## 🌐 Free Deployment (Vercel + Neon)

1. **Database**: Create a free PostgreSQL instance at [Neon](https://neon.tech) and copy your connection string.
2. **Push Schema**: Run `npm run db:setup` with your `DATABASE_URL` to seed your database.
3. **Deploy to Vercel**:
   - Import your repository on [Vercel](https://vercel.com).
   - In **Environment Variables**, add:
     - `DATABASE_URL`: Your Neon PostgreSQL connection string.
     - `ADMIN_JWT_SECRET`: A secure JWT signing secret.
   - Click **Deploy**.

---

## 📁 Directory Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema models & PostgreSQL config
│   ├── seed.js                # Database seeding script for club data
│   └── dev.db                 # Local SQLite fallback database
├── public/                    # Static assets, team portraits, brand marks
├── src/
│   ├── app/                   # Next.js App Router routes & API endpoints
│   │   ├── admin/             # Council CMS Dashboard & Login
│   │   ├── api/               # Serverless API routes (auth, reports, admin CRUD)
│   │   ├── departments/       # Individual Division portals ([slug])
│   │   ├── events/            # Events radar & hackathon timeline
│   │   ├── quizzes/           # Interactive quiz player & diagnostic arena
│   │   ├── report-cheating/   # Confidential plagiarism reporting portal
│   │   ├── resources/         # Curated learning resources catalog
│   │   ├── team/              # Coordinators & Sub-Coordinators roster
│   │   ├── layout.tsx         # Global layout with 3D canvas & Lenis scroll
│   │   └── page.tsx           # Club home page & interactive divisions deck
│   ├── components/            # Reusable UI components (Navbar, 3D Canvas, Bento cards)
│   ├── data/                  # Static coordinator & sub-coordinator rosters
│   └── lib/                   # Database client (Prisma), JWT auth, utility functions
└── package.json
```

---

## 🤝 Contributing

Contributions from IIT Patna students and open-source enthusiasts are welcome!
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to your branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 👤 Author & Maintainer

Developed and maintained with ❤️ by **NJACK, IIT Patna**.
