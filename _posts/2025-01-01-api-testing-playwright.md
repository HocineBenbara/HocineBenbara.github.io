---
title: "How I Tested a REST API Using Playwright"
date: 2025-05-01
---

In this article, I explain how I implemented automated API tests using Playwright for user management in **Sisalto AdminLight**.

### Objectives
- Authenticate using Bearer token
- Validate CRUD responses (200, 201, 400)
- Ensure test isolation with unique usernames
- Clean test data after execution

### Tools Used
- Playwright (TypeScript)
- REST API
- JSON schema validation
- Zephyr for test result reporting

This approach ensures reliable backend testing without UI dependency — faster and more stable.
