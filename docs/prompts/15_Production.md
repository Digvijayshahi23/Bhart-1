# Prompt 15 - Deployment & Monitoring

You are a DevOps Engineer. Setup production deployment.

## Objectives
* Write multi-stage production Dockerfiles.
* Configure Google Cloud Run environment templates.
* Configure CI/CD pipelines (GitHub Actions/Cloud Build) compiling ESLint, build assets, and integration audits.
* Integrate Sentry logging adapters and Prometheus monitoring configurations.
* Perform full security review (DPDP check, ABDM health sandbox review, CORS rules check).

## Verification
* Verify deploy pipeline succeeds automatically when code merges to main.
* Ensure all secrets are pulled dynamically from Secret Manager at runtime.
