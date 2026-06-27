# Contributing to BharatOne AI

Thank you for your interest in contributing to BharatOne AI! 🇮🇳

We welcome contributions from everyone — whether it's fixing a bug, adding a feature, improving documentation, or translating content.

---

## 🚀 Getting Started

### 1. Fork the repository
Click "Fork" on the GitHub repository page.

### 2. Clone your fork
```bash
git clone https://github.com/<your-username>/Bhart-1.git
cd Bhart-1
```

### 3. Set up environment
```bash
cp .env.example .env
# Fill in your API keys
npm install
npm run dev
```

---

## 📋 Contribution Guidelines

### Code Style
- All code must pass `npm run lint` with zero errors
- Follow the existing feature-first folder structure (`src/features/<module>/`)
- Use existing shared components from `src/components/common/`
- No hardcoded strings for UI text — prepare for i18n

### Commit Convention
We use **Conventional Commits**:
```
feat: add new government scheme filter
fix: resolve notification badge count
docs: update API guide
chore: upgrade dependencies
refactor: simplify recommendation engine
```

### Branch Naming
```
feat/<feature-name>
fix/<issue-description>
docs/<document-name>
chore/<task>
```

---

## 🔄 Pull Request Process

1. Create a branch: `git checkout -b feat/your-feature`
2. Make your changes with clean, documented code
3. Run `npm run lint` and `npm run build` — both must pass
4. Open a Pull Request against `main`
5. Fill in the PR template completely
6. Wait for review

---

## 🌏 Language Contributions

BharatOne AI supports 12 Indian languages. If you'd like to contribute translations, open a PR with translated string files in `src/i18n/`.

---

## 🐛 Reporting Bugs

Use the GitHub Issue templates. Include:
- Steps to reproduce
- Expected behaviour
- Actual behaviour
- Browser / OS version
- Console errors (if any)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
