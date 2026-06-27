# Changelog

All notable changes to BharatOne AI are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/).

---

## [1.0.0] — 2026-06-28

### 🎉 Initial Production Release

This is the first public release of BharatOne AI — India's AI-powered universal citizen assistant.

### Added

#### Core Infrastructure (Phases 1–4)
- Firebase Authentication (email/password, email verification)
- Supabase integration for profile and data persistence
- React 19 + Vite 8 project setup with ESLint + Prettier
- Tailwind CSS v4 design system with saffron, green, navy Indian theme
- Responsive layout with Navbar, Header, Footer, Card, Badge, Button, Input, Tabs
- Smart Dashboard with personalized greeting and module quick-actions
- Universal AI Chat powered by Google Gemini 2.0 Flash

#### Government Schemes Portal (Phases 5–7)
- 50+ government welfare schemes database
- Category filters (Agriculture, Health, Education, Housing, Finance)
- Search, bookmark, and eligibility checker
- State-specific scheme recommendations

#### AI Document Intelligence (Phase 8)
- Support for Aadhaar, PAN, Ration Card, Passport, Birth Certificate, Land Records
- AI-powered plain-language explanation of uploaded documents
- Firebase Storage for secure document upload

#### AI Healthcare Assistant (Phase 9)
- Prescription reader and medicine explainer
- Lab report simplifier
- First aid guide
- Health scheme finder (Ayushman Bharat)
- Medical disclaimer on every response

#### Career & Scholarship Advisor (Phase 10)
- Government exam preparation (UPSC, SSC, Railways)
- Scholarship finder (NSP, state schemes)
- Resume builder guidance
- Career roadmap generator

#### Legal Information Assistant (Phase 11)
- Consumer rights guide
- FIR filing process
- Cybercrime reporting
- RTI guide
- Tenant rights
- Legal disclaimer on every response

#### Finance & Welfare Assistant (Phase 12)
- Budget planner
- EMI and loan calculator
- Tax basics (ITR filing guide)
- Pension scheme explainer
- Government welfare eligibility

#### Citizen Profile & Personalization (Phase 13)
- Profile completion tracker
- Cross-module bookmark aggregation
- Notification center (5 categories)
- Activity timeline
- Search and chat history
- Settings: language selector, accessibility toggles, data export

#### Production Optimization (Phase 14)
- Centralized AI Orchestrator with intent detection and module routing
- Gemini config with retry (x3), timeout (30s), rate-limit backoff
- Global ErrorBoundary with bilingual fallback UI
- Two-tier cache (memory + localStorage, TTL-based)
- Structured logger with session tracking
- Input sanitizer (XSS, file validation, query cap)
- Performance utilities (debounce, throttle, prefetch, idle scheduling)
- Lazy-loaded routes with React.lazy + Suspense (35 isolated chunks)
- Vite manual chunk splitting (react / firebase / supabase / icons)

#### Production Release (Phase 15)
- Full SEO meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- PWA manifest and theme-color
- robots.txt and sitemap.xml
- Vercel deployment config with security headers
- MIT License
- CODE_OF_CONDUCT.md
- CONTRIBUTING.md
- SECURITY.md
- GitHub issue and PR templates
- Comprehensive README

---

## [Unreleased] — Future

### Planned for v1.1.0
- Full Supabase database wiring with RLS
- Complete i18n for all 12 Indian languages
- Image optimization (WebP, lazy loading)
- CI/CD GitHub Actions pipeline
- Screen reader full audit
- Voice command architecture

---

*Built with ❤️ for every Indian citizen — Powered by Google Gemini + Firebase + Supabase*
