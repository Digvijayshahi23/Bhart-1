# BharatOne AI 🇮🇳

**India's AI-Powered Universal Citizen Assistant Platform**

> BharatOne AI is a startup-grade, full-stack web application that empowers every Indian citizen with AI-assisted access to government schemes, healthcare guidance, legal information, career advisory, financial literacy, and intelligent document analysis.

---

## 🏗️ Architecture Overview

```
BharatOne AI
│
├── Frontend (React 19 + Vite 8)
│   ├── Features (Feature-first architecture)
│   │   ├── landing/          — Public landing page
│   │   ├── auth/             — Firebase Authentication
│   │   ├── dashboard/        — Smart personalized dashboard
│   │   ├── chat/             — Universal AI chat (Gemini)
│   │   ├── schemes/          — Government Schemes portal
│   │   ├── documents/        — AI Document Intelligence
│   │   ├── healthcare/       — AI Healthcare Assistant
│   │   ├── career/           — Career & Scholarship Advisor
│   │   ├── legal/            — Legal Information Assistant
│   │   ├── finance/          — Finance & Welfare Assistant
│   │   └── profile/          — Citizen Profile & Personalization
│   │
│   ├── Services
│   │   ├── ai/               — Gemini orchestrator, config, intent detection
│   │   ├── cache/            — Two-tier memory + localStorage cache
│   │   ├── logger/           — Structured application logger
│   │   └── personalization/  — Profile analyzer, recommendations, notifications
│   │
│   └── Utils
│       ├── sanitize.js       — XSS protection, input validation
│       └── performance.js    — Debounce, throttle, idle scheduling
│
├── Backend
│   ├── Firebase Auth         — Email/password + email verification
│   ├── Firebase Storage      — Document uploads
│   ├── Supabase Postgres     — User profiles, bookmarks, history
│   └── Google Gemini 2.0    — AI responses with retry + fallback
│
└── Infrastructure
    ├── Vite (code splitting, lazy loading)
    ├── ESLint + Prettier
    └── GitHub (CI/CD ready)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- npm >= 9

### 1. Clone
```bash
git clone https://github.com/Digvijayshahi23/Bhart-1.git
cd Bhart-1
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
# Fill in your keys (see Environment Variables section)
```

### 4. Run development server
```bash
npm run dev
# → http://localhost:5173
```

### 5. Build for production
```bash
npm run build
```

### 6. Lint
```bash
npm run lint
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
# ── Gemini AI ──────────────────────────────────────────────────────────────
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# ── Firebase ───────────────────────────────────────────────────────────────
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# ── Supabase ───────────────────────────────────────────────────────────────
VITE_SUPABASE_URL=https://your_project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ **Never commit `.env` to version control.** It is already in `.gitignore`.

---

## 📁 Folder Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── assets/
├── components/
│   └── common/
│       ├── ErrorBoundary.jsx
│       ├── Navbar.jsx
│       ├── Header.jsx
│       ├── Footer.jsx
│       ├── Card.jsx
│       ├── Badge.jsx
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Tabs.jsx
│       ├── Progress.jsx
│       ├── Avatar.jsx
│       └── SearchBar.jsx
├── config/
├── constants/
├── contexts/
│   └── AuthContext.jsx
├── features/
│   ├── landing/
│   ├── auth/
│   ├── dashboard/
│   ├── chat/
│   ├── schemes/
│   ├── documents/
│   ├── healthcare/
│   ├── career/
│   ├── legal/
│   ├── finance/
│   └── profile/
├── hooks/
├── lib/
├── routes/
│   ├── index.jsx        ← Lazy-loaded routes + ErrorBoundary
│   └── ProtectedRoute.jsx
├── services/
│   ├── ai/
│   │   ├── geminiConfig.js       ← Gemini 2.0 Flash client
│   │   └── aiOrchestrator.js     ← Intent detection + module routing
│   ├── cache/
│   │   └── cacheManager.js
│   ├── logger/
│   │   └── logger.js
│   └── personalization/
│       ├── activityTracker.js
│       ├── bookmarkManager.js
│       ├── historyManager.js
│       ├── notificationEngine.js
│       ├── profileAnalyzer.js
│       └── recommendationEngine.js
├── shared/
├── styles/
└── utils/
    ├── sanitize.js       ← XSS / input validation
    └── performance.js    ← Debounce, throttle, prefetch
```

---

## 🤖 AI Architecture

### Intent Detection Flow
```
User Query
    ↓
detectIntent()     ← Keyword-based module routing
    ↓
buildContext()     ← Profile, location, occupation context
    ↓
buildSystemPrompt()← Per-module specialized prompt
    ↓
callGemini()       ← Retry x3, timeout 30s, rate-limit handling
    ↓
formatResponse()   ← Fallback on error
    ↓
User sees response + suggestedRoute (optional deep-link)
```

### Supported Modules
| Module | Route | Intent Keywords |
|---|---|---|
| Government Schemes | `/schemes` | योजना, scheme, subsidy, PM Kisan |
| Healthcare | `/healthcare` | दवा, doctor, hospital, health |
| Legal | `/legal` | FIR, court, legal, कानून |
| Career | `/career` | UPSC, SSC, scholarship, job |
| Finance | `/finance` | loan, tax, insurance, budget |
| Documents | `/documents` | document, दस्तावेज़, upload, scan |

---

## 🛡️ Security Checklist

- [x] Protected routes via `ProtectedRoute` HOC
- [x] Firebase Auth with email verification
- [x] Input sanitization (`sanitize.js`) — XSS strip, length cap
- [x] File upload validation (type + size + filename check)
- [x] No hardcoded secrets — all via `import.meta.env`
- [x] `.env` in `.gitignore`
- [x] Supabase RLS-ready schema design
- [x] Global ErrorBoundary (prevents crash-screen information leakage)
- [ ] Content Security Policy headers (Phase 15 — server config)
- [ ] CSRF tokens (Phase 15 — requires backend middleware)

---

## ♿ Accessibility

- [x] Semantic HTML5 elements throughout
- [x] ARIA roles and labels on interactive elements
- [x] Focus indicators on all buttons/inputs
- [x] `role="alert"` / `aria-live` on error states
- [x] `role="status"` on loading states
- [x] Color contrast meets WCAG AA target
- [x] Keyboard navigation (tab order preserved)
- [x] Bilingual UI (Hindi + English) for accessibility
- [ ] Full screen-reader audit (Phase 15)
- [ ] Voice navigation (Phase 15)

---

## ⚡ Performance

- [x] Lazy-loaded routes (React.lazy + Suspense)
- [x] Vite manual chunk splitting (react / firebase / supabase / icons isolated)
- [x] Two-tier cache (memory + localStorage with TTL)
- [x] Debounce / throttle on search and scroll events
- [x] `requestIdleCallback` for non-critical work
- [x] Route prefetching utility
- [x] Tree-shaking via ES modules
- [ ] Image optimization (WebP, `loading="lazy"`) — Phase 15
- [ ] Virtual list for long item feeds — Phase 15

---

## 🌏 Language Support

Architecture supports 12 Indian languages:

| Language | Code |
|---|---|
| Hindi | hi |
| English | en |
| Tamil | ta |
| Telugu | te |
| Kannada | kn |
| Malayalam | ml |
| Marathi | mr |
| Gujarati | gu |
| Punjabi | pa |
| Bengali | bn |
| Odia | or |
| Assamese | as |

> Full i18n translation strings to be implemented in Phase 15.

---

## 🗄️ Database Schema (Supabase)

| Table | Key Fields |
|---|---|
| `profiles` | id, name, phone, state, district, occupation, language, photoURL |
| `user_preferences` | id, user_id, theme, language, accessibility_flags |
| `bookmarks` | id, user_id, module, item_id, created_at |
| `notifications` | id, user_id, category, title, body, read, timestamp |
| `activity_logs` | id, user_id, type, title, module, timestamp |
| `search_history` | id, user_id, query, module, pinned, timestamp |
| `chat_history` | id, user_id, title, module, pinned, date |
| `recommendations` | id, user_id, profile_tags, generated_at |

---

## 📦 Phases Completed

| Phase | Module | Status |
|---|---|---|
| 1 | Project Bootstrap + Auth | ✅ |
| 2 | Landing Page + Design System | ✅ |
| 3 | Smart Dashboard | ✅ |
| 4 | Universal AI Chat | ✅ |
| 5–7 | Government Schemes Portal | ✅ |
| 8 | AI Document Intelligence | ✅ |
| 9 | AI Healthcare Assistant | ✅ |
| 10 | Career & Scholarship Advisor | ✅ |
| 11 | Legal Information Assistant | ✅ |
| 12 | Finance & Welfare Assistant | ✅ |
| 13 | Citizen Profile & Personalization | ✅ |
| 14 | AI Orchestrator, Performance, Security | ✅ |
| 15 | Deployment, i18n, Advanced Accessibility | 🔜 |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit with conventional commits: `git commit -m "feat: add XYZ"`
4. Push and open a Pull Request

---

## 📄 License

MIT License © 2026 BharatOne AI Team

---

*Built with ❤️ for every Indian citizen — Powered by Google Gemini + Firebase + Supabase*
