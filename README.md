# PROMT AI — PromptPilot

PROMT AI (PromptPilot) is a modern, high-performance, and visually stunning web application designed to optimize and refine user prompts for various AI engines. Powered by Google's Gemini AI, it streams structured, production-ready, and AI-optimized prompts to enhance prompt engineering workflows for developers, content creators, and AI enthusiasts.

🚀 **Live Site:** [prompt-pilot-taupe.vercel.app](https://prompt-pilot-taupe.vercel.app)

---

## 📖 Table of Contents

- [Features](#-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Gemini AI Engine Integration](#-gemini-ai-engine-integration)
- [Deployment](#-deployment)
- [License](#-license)

---

## ✨ Features

- **Prompt Optimization Engine**: Transforms raw, simple prompts into detailed, structured, and highly effective instructions.
- **Real-Time Streaming Response**: Employs Gemini's streaming API to deliver instant, chunk-by-chunk markdown outputs directly to the interface.
- **Immersive User Experience**:
  - Smooth custom introductory loading screen ("Built By Vaishnu").
  - Animated, responsive layouts featuring framer-motion and GSAP.
  - Alternating Toonhub Carousel showcasing custom 3D avatars and product showcases.
  - Interactive background video panels.
- **Structured Outputs**: Prompts are analyzed and returned in four distinct, easy-to-read sections:
  1. **Analyzed Intent**: Deep-dive analysis of the user's core goal.
  2. **Optimized Prompt**: Ready-to-copy, high-fidelity prompt.
  3. **Tech Stack & Framework Suggestions**: Recommended tools and stacks for the task.
  4. **Prompt Quality Score**: A direct comparative score (Original vs. Optimized).

---

## 🛠 Architecture & Tech Stack

The application is built on a modern, ultra-fast frontend stack:

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/) (leveraging fast Hot Module Replacement)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict type checking)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS for fluid layouts and animations
- **Motion Libraries**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/) (GreenSock) for high-framerate transitions
- **Routing**: [React Router DOM v7](https://reactrouter.com/) for client-side navigation
- **AI Integration**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) SDK

---

## 📁 Project Structure

```bash
PROMT AI/
├── public/                 # Static assets (videos, public images)
├── src/
│   ├── assets/             # Bundled media files and SVGs
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Sticky global navigation
│   │   ├── Hero.tsx        # Interactive home page hero section
│   │   ├── CinematicSection.tsx # Workflow/pipeline explanation with background video
│   │   ├── ToonhubCarousel.tsx  # Dynamic 3D avatar & showcase carousel
│   │   ├── ContactFooter.tsx    # Footer with email and social links
│   │   └── LoadingScreen.tsx    # Custom preloader screen
│   ├── lib/
│   │   └── gemini.ts       # Google Gemini 2.5 Flash SDK configuration & stream function
│   ├── pages/
│   │   ├── LandingPage.tsx # Standard website entry landing page
│   │   ├── LuminaPage.tsx  # Layout container for the prompt optimizer page
│   │   └── OptimizerPage.tsx # Complete prompt optimizer UI & stream handler
│   ├── App.tsx             # Route definitions & router mapping
│   ├── main.tsx            # Main DOM entrypoint
│   └── index.css           # Tailwind directives & custom CSS rules
├── package.json            # Scripts & project dependencies
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment configurations
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and `npm` installed.

### ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vaishnu13/PROMTAI.git
   cd PROMTAI
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   > ⚠️ **Important**: Never commit your `.env.local` file to Github. It is automatically ignored in `.gitignore`.

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🤖 Gemini AI Engine Integration

The core prompt optimization logic is handled in `src/lib/gemini.ts`. 

- **Model**: `gemini-2.5-flash`
- **System Instruction**: Forces the model to act as **PromptPilot**, evaluating the quality of inputs and structuring responses under four specific markdown headers.
- **Streaming Function**: Utilizes `generateContentStream` to allow React to read chunks as they arrive from the Google Generative AI API:
  ```typescript
  export async function optimizePromptStream(
    userPrompt: string,
    onChunk: (text: string) => void
  ) { ... }
  ```

---

## 🌐 Deployment

The application is optimized for deployment on **Vercel**.

- **Automatic Deployments**: Any push or merge to the `main` branch triggers an automated build pipeline on Vercel.
- **Environment Settings**: Make sure to define the `VITE_GEMINI_API_KEY` environment variable in the Vercel project dashboard to enable the optimizer in production.

---

## 📄 License

This project is private and proprietary. All rights reserved.
