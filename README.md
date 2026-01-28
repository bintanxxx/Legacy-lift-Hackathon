# ⚡ LegacyLift AI

> **Refactor. Modernize. Migrate.** > An intelligent code evolution platform powered by **Google Gemini 3**.
<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)

![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=flat-square&logo=radix-ui&logoColor=white)

![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-3.0%20Pro-8E75B2?style=flat-square&logo=google&logoColor=white)

</div>

<br />

![LegacyLift AI Demo](public/images/demo.png)

## 🚀 About The Project

LegacyLift AI is not just a code formatter. It acts as an **AI Software Architect** that helps developers transform legacy codebases into modern, high-performance applications.

Whether you need to clean up spaghetti code, modernize syntax (e.g., React Class to Hooks), or port logic to a completely different language (e.g., Python to Go), LegacyLift handles it with deep reasoning capabilities provided by **Google Gemini 3**.

## ✨ Key Features

* **🧹 Smart Refactoring:** Automatically separates concerns, improves naming, and modularizes monolithic functions.
* **✨ Syntax Modernization:** Upgrades legacy patterns (Callbacks, Class Components) to modern standards (Async/Await, Hooks) without breaking logic.
* **🚀 Polyglot Migration:** intelligently ports code between languages (JS, Python, Go, PHP) while preserving idiomatic best practices.
* **📱 Native-Like UI:** Fully responsive design with a "VS Code-like" experience on Desktop and a compact, app-like interface on Mobile.
* **⚡ Real-time Diff:** Side-by-side comparison to verify AI changes instantly.

## 🛠️ Tech Stack

### Frontend & UI
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
* **Editor Engine:** Monaco Editor (Powering the VS Code experience)

### Backend, Data & Auth
* **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
* **ORM:** [Prisma](https://www.prisma.io/) (Type-safe database access)
* **Authentication:** JWT (JSON Web Tokens) with Middleware protection
* **Storage:** Supabase Storage (For saving refactoring history/assets)

### Artificial Intelligence
* **Core Engine:** [Google Gemini 3 Pro](https://ai.google.dev/) (`gemini-1.5-pro-latest` / Experimental)
* **SDK:** Google GenAI SDK for Node.js

## 💻 Getting Started

Follow these steps to run the project locally:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/username/legacy-lift.git](https://github.com/username/legacy-lift.git)
    cd legacy-lift
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file in the root directory and add your API Keys:
    ```env
    # Google Gemini
    GEMINI_API_KEY=your_gemini_api_key

    # Database (Supabase)
    DATABASE_URL="postgresql://user:password@host:port/db?schema=public"
    DIRECT_URL="postgresql://..."
    
    # Auth Secrets
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Run Database Migrations**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the development server**
    ```bash
    npm run dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

Built with ❤️ for the **Google Gemini 3 Hackathon**.
