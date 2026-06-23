
<h1 align="center">Securing your code with GitHub</h1>

<h5 align="center"><a href="https://github.com/joshjohanning">@joshjohanning</a> <a href="https://github.com/mickeygousset">@mickeygousset</a>
<a href="https://github.com/writingpanda">@writingpanda</a>
<a href="https://github.com/felickz">@felickz</a>
<a href="https://github.com/tspascoal">@tspascoal</a>
</h5>

<p align="center">
  <a href="#workshop-labs">Workshop Labs</a>
  <a href="#book-resources">Resources</a>
</p>

- **Who is this for**: Enterprise - Engineering Leadership, Enterprise - Developers, Open Source Developers or Maintainers, Security Professionals, Startups, Security Leadership, Educators
- **What you'll learn**: Here at GitHub, we like to say that "found means fixed." That's because when issues are found they can more easily be fixed. In this workshop you'll dive into a repository filled with security alerts and begin to remediate them using GitHub Advanced Security (GHAS) and Dependabot, effectively maintaining code integrity. You'll also encounter and resolve a few security issues using Copilot Autofix. The end goal? To learn and develop strategies to motivate your developers to turn reactive fixes into proactive security habits.


See [requirements](_labs/requirements.md) to see what is needed to run this lab.

## Security usage and rollout notes

This repository includes OWASP Juice Shop code for security training. It intentionally contains insecure patterns and challenge-focused behaviors, so treat it as a lab environment and not as a production baseline.

### Current security model (what exists today)

1. **Authentication:** Most protected APIs expect a JWT in `Authorization: Bearer <token>` and are guarded with `security.isAuthorized()` in `server.ts`. Some routes also rely on the `token` cookie via `security.updateAuthenticatedUsers()`.
2. **Authorization:** Route-level checks are mixed (`isAuthorized()`, `appendUserId()`, `isAccounting()`), so access control is not globally consistent.
3. **Secrets and keys:** JWT verification reads `encryptionkeys/jwt.pub`, while signing currently uses an embedded private key in `lib/insecurity.ts` (training-only posture).
4. **Validation and abuse controls:** Validation/sanitization and rate limiting are endpoint-specific (e.g., registration trimming, upload checks, reset-password and 2FA rate limits) rather than centralized.
5. **Runtime exposure:** Several routes are intentionally exposed for learning/challenges (e.g., `/ftp`, `/encryptionkeys`, `/support/logs`, `/metrics`, `/api-docs`).

### Operational guidance

1. **Do not use real credentials or production secrets** anywhere in this repository, challenge payloads, test data, or config overrides.
2. **Prefer safe default runtime config** (`config/default.yml` with `challenges.safetyMode: auto`) for demos; only use `config/unsafe.yml` or challenge-heavy profiles in isolated training environments.
3. **Run behind a controlled boundary** (private network, VPN, or reverse proxy ACLs) when exposing this app beyond localhost.
4. **Treat uploaded/generated artifacts as sensitive** and avoid publishing logs, backup files, or generated challenge data.

### Migration and hardening rollout (recommended sequence)

1. **Environment profile first:** Move deployments off `unsafe`/`ctf` profiles to default/safer settings so environment-based challenge restrictions are respected.
2. **Key management next:** Replace embedded signing material with externally managed keys/secrets and rotate any previously shared keys before wider access.
3. **Edge protection:** Restrict or disable challenge-only endpoints (`/ftp`, `/encryptionkeys`, `/support/logs`, `/metrics`, `/api-docs`) at the ingress layer for non-training audiences.
4. **Validation/rate-limit pass:** Standardize request validation and rate-limiting across write/authentication endpoints before broader rollout.
5. **Communication:** Notify lab operators that challenge availability may change after safer profiles and endpoint restrictions are enabled.

---

## Workshop Labs

### Lab 1 - GitHub Advanced Security Feature Introduction

This lab will introduce you to GitHub Advanced Security (GHAS) and its features.

- Get started here - [Lab 1](./_labs/lab1.md)

---

### Lab 2 - Reviewing and Managing Security Alerts

This lab will show you how to review and managed the alerts created in Lab 1.

- Get started here - [Lab 2](./_labs/lab2.md)

---

### Lab 3 - Hands-on with Code Scanning

This lab will have you add some bad code, utilize repository rulesets to block the code, and Copilot Autofix to fix the code.

- Get started here - [Lab 3](./_labs/lab3.md)

---

### Lab 4 - Hands-on with Dependency Review

This lab will have you utilize the Dependency Review action to stop a bad vulnerability in a pull request.

- Get started here - [Lab 4](./_labs/lab4.md)

---

### Lab 5 - Hands-on with Secret Scanning

This lab will have you utilize Secret Scanning with Push Protection to prevent secrets from entering the codebase.

- Get started here - [Lab 5](./_labs/lab5.md)

---

### Lab 6 - Hands-on with Security Overview

This lab will teach you how to effectively use the Security Overview to review and alerts and coverage in an organization.

- Get started here - [Lab 6](./_labs/lab6.md)

---


### Extra Credit: Advanced CodeQL Setup

This open-ended extra credit lab will have you switch to the advanced CodeQL setup.

- Get started here - [Extra Credit Lab 1](./_labs/lab7-ec.md)

---

### Extra Credit: Custom Patterns for Secret Scanning

This open-ended extra credit lab will have you create a custom secret scanning pattern.

- Get started here - [Extra Credit Lab 2](./_labs/lab8-ec.md)

---

## :book: Resources

- [GitHub Docs - About GitHub Advanced Security](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security)
- [GitHub Security Learning Pathway](https://resources.github.com/learn/pathways/security/)


## License 

### Securing your code with GitHub

This project is licensed under the terms of the MIT open source license. Please refer to [MIT](./LICENSE) for the full terms.

### OWASP Juice Shop

This lab uses and includes sample code from the OWASP Juice Shop project. The Juice Shop is Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors. Please refer to the [LICENSE](./LICENSE) for the full terms.
