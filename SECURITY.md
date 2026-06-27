# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 1.0.x | ✅ Active |

---

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in BharatOne AI, please report it responsibly by:

1. **Email**: Open a private GitHub Security Advisory at: `https://github.com/Digvijayshahi23/Bhart-1/security/advisories/new`
2. Include a clear description of the vulnerability
3. Include steps to reproduce the issue
4. Include the potential impact

We will acknowledge your report within **48 hours** and aim to provide a patch within **7 days** for critical vulnerabilities.

---

## Security Best Practices for Deployers

- Never commit `.env` files to version control
- Set all environment variables via your hosting platform (e.g., Vercel Dashboard)
- Enable Firebase Authentication email verification
- Configure Supabase Row Level Security (RLS) on all tables
- Review all Firebase Storage security rules before production

---

## Scope

The following are **in scope** for vulnerability reports:
- Authentication bypass
- Cross-site scripting (XSS)
- Insecure data exposure
- Firebase/Supabase misconfiguration leading to data leaks
- API key exposure in source code

The following are **out of scope**:
- Social engineering attacks
- Attacks requiring physical access to a device
- Denial of service (DoS) attacks
