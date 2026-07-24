# Contributing

## Table of Contents
- [Getting Started](#getting-started)
- [How to Report Issues](#how-to-report-issues)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Code Style](#code-style)
- [Commit Conventions](#commit-conventions)
- [Branching Strategy](#branching-strategy)

## Getting Started

This repository contains exercises for the [Full Stack Open](https://fullstackopen.com/en) course by the University of Helsinki. Contributions such as improving exercise docs, fixing typos, or adding clarifying examples are welcome.

> **Note:** Each `partN/` directory is an independent project. Do not modify files outside the part directory where the exercise belongs.

## How to Report Issues

Please open an issue using the appropriate template:

- **Bug report** — [bug_report](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature request** — [feature_request](.github/ISSUE_TEMPLATE/feature_request.md)

Include as much detail as possible so we can reproduce the problem.

## Submitting Pull Requests

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes in the relevant part directory
4. Commit with clear, descriptive messages (see [Commit Conventions](#commit-conventions))
5. Push to your fork and open a Pull Request

Pull requests should target `main` and include a clear description of what was changed and why.

## Code Style

This project uses an [.editorconfig](.editorconfig) for consistent formatting across editors:

- **Indentation:** 2 spaces
- **Encoding:** UTF-8
- **Line endings:** LF (Unix)
- **Trailing whitespace:** trimmed

Code should follow these conventions:

- **JavaScript/TypeScript:** Modern ES6+ syntax, functional components with React Hooks, named exports
- **CSS:** Scoped styles, CSS Modules, or utility-first approaches as introduced in each part
- **REST APIs:** Standard HTTP methods, proper status codes, consistent JSON responses
- **React:** Clean component design, custom hooks where appropriate, no unnecessary global state

## Commit Conventions

Use [Conventional Commits](https://www.conventions-commit.io/) format:

| Prefix | Use for | Example |
|---|---|---|
| `docs:` | Documentation only | `docs: update README structure` |
| `chore:` | Build tooling, config changes | `chore: add CONTRIBUTING.md` |
| `feat:` | New exercise or feature | `feat: add part3 MongoDB exercises` |
| `fix:` | Bug fixes | `fix: correct axios error handling` |
| `test:` | Adding or updating tests | `test: add Vitest setup for part5` |
| `refactor:` | Code refactoring without behavior changes | `refactor: clean up Express middleware` |

## Branching Strategy

- **`main`:** Public exercises and course work. Do not commit sandbox code here.
- **`sandbox`:** Experimental code, custom Express servers, and personal projects built during the course.
