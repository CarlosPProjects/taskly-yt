

---

# AI-Powered Productivity Suite 🚀

_Next.js Full-Stack Application with Real-Time AI Integration_

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcarlospprojects%2Ftaskly-yt)

![App Preview](https://github.com/user-attachments/assets/b3994c2c-29d9-4619-bea6-04ae4abe0dd7)


## 🌟 Features

- **AI Task Assistant**
  - Natural language CRUD operations via chat
  - Data analysis and optimization suggestions
  - Toolcalling with Vercel AI SDK
- **Core Functionality**
  - Real-time task synchronization (Convex DB)
  - Secure authentication (Clerk)
  - Responsive dashboard with metrics
- **Tech Highlights**
  - Type-safe API layer
  - Modern UI components (shadcn/ui)
  - Edge-ready deployment

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TailwindCSS
- **Backend**: Convex (Database/Server Functions)
- **Auth**: Clerk
- **AI**: Vercel AI SDK, OpenAI API
- **Tools**: TypeScript, Zod, React Query

## ⚡ Quick Start

### Prerequisites

- Node.js 20+ OR pnpm 9+
- OpenAI API Key
- Clerk & Convex accounts

### Installation

```bash
git clone https://github.com/carlospprojects/taskly-yt.git
cd taskly-yt
npm install  # or pnpm install / yarn
```

### Configuration

1. Create `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_convex_url
OPENAI_API_KEY=your_openai_key
DEEPSEEK_API_KEY=optional_deepseek_key
```

2. Set up services:

- [Clerk Setup Guide](https://clerk.com/docs)
- [Convex Initialization](https://docs.convex.dev/get-started)
- [OpenAI Key](https://platform.openai.com/api-keys)

### Running Locally

```bash
npm run dev
# Convex development mode
npx convex dev
```

## 🧠 AI Interaction Examples

```plaintext
/user: "Create new task 'Fix responsive layout' with high priority"
/ai: Creates task and confirms via database mutation

/user: "Show me overdue tasks from last week"
/ai: Queries DB and returns filtered results

/user: "Analyze my productivity patterns"
/ai: Generates report using task metadata
```

## 🚀 Deployment

1. Vercel:

```bash
vercel
```

2. Set same environment variables in production
3. Configure Convex production project:

```bash
npx convex deploy
```

## 📂 Project Structure

```
/src
├── app/(dashboard)       # Auth-protected routes
├── app/api               # Edge API routes
├── components            # Global components
├── lib                   # Utils, hooks, etc.
├── hooks                 # Custom hooks
├── ai                    # Tools, AI SDK, etc.
└── constants             # Constants, enums, etc.
/convex                   # Database config, schema & mutations
```

---

**Need Help?**  
Open an issue or contact [carlos@cgaravito.dev](mailto:carlos@cgaravito.dev)

[![GitHub Stars](https://img.shields.io/github/stars/carlospprojects/taskly-yt?style=social)](https://github.com/carlospprojects/taskly-yt)

---
