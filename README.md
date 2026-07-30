# Full Stack Open — University of Helsinki

Exercises for the [Full Stack Open](https://fullstackopen.com/en) course by the University of Helsinki. This course covers modern web development with React, Node.js, Express, GraphQL, TypeScript, Docker, and more.

<div align="center">

![MIT License](https://img.shields.io/badge/license-MIT-blue)
![Courses](https://img.shields.io/badge/courses-15%20parts-purple)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![React](https://img.shields.io/badge/React-20.0-61dbce?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

</div>

## Table of Contents
- [Course](#full-stack-open--university-of-helsinki)
- [Directory Structure](#directory-structure)
- [Technologies](#technologies)
- [How to Run Exercises](#how-to-run-exercises)
- [Custom Projects](#custom-projects)
- [Contributing](#contributing)
- [License](#license)

## Directory Structure & Course Part Status

| Directory | Description | Exercises | Status |
|:---:|---|---|:---:|
|[`part0/`](part0/)|Fundamentals of Web Apps <br /> (HTTP, forms, basic SPA concepts) | Note App Traditional ([`Flow`](/part0/0.4-new-note-traditional-flow.md))<br />SPA Note Loading ([`Flow`](/part0/0.5-spa-loading-flow.md))<br />SPA New Note ([`Flow`](/part0/0.6-spa-new-note-flow.md))|✔️|
|[`part1/`](part1/)|Introduction to React <br /> (components, state, hooks)|Course Info App ([`Source`](part1/courseinfo/))<br />UniCafe App ([`Source`](part1/unicafe/))<br />Anecdotes App ([`Source`](part1/anecdotes/))|✔️|
|`part2/`|Communicating with Servers <br /> (AJAX, Express, Axios, CSS)||🔄|
|`part3/`|Programming a Server with Express <br /> (REST APIs, MongoDB)||⏳|
|`part4/`|Testing Express Servers & User Administration <br /> (Supertest, authentication)||⏳|
|`part5/`|Testing React Apps <br /> (Vitest, component testing)||⏳|
|`part6/`|Advanced State Management <br /> (Redux Toolkit, useReducer, Context)||⏳|
|`part7/`|React Router, Custom Hooks, Styling <br /> (navigation, Webpack, UI frameworks)||⏳|
|`part8/`|GraphQL <br /> (Apollo Client, schemas, queries, mutations, subscriptions)||⏳|
|`part9/`|TypeScript <br /> (typed Express backends and React components)||⏳|
|`part10/`|React Native <br /> (mobile development, storage, testing)||⏳|
|`part11/`|CI/CD <br /> (GitHub Actions, build pipelines, deployments)||⏳|
|`part12/`|Containers <br /> (Docker, multi-container setups, production)||⏳|
|`part13/`|Relational Databases <br /> (Sequelize, PostgreSQL, migrations)||⏳|
|`part14/`|Next.js <br /> (server-side rendering, app router)||⏳|

Completed = ✔️ Inpogress = 🔄 Not Started = ⏳

## Technologies

**Backend:** Express · Node.js · MongoDB · Express · GraphQL
**Frontend:** React · Vite · React Router · Redux Toolkit
**Testing:** Jest · Vitest · Supertest
**Other:** TypeScript · Docker · GitHub Actions · PostgreSQL · Sequelize

## How to Run Exercises

Each part directory is an independent project. Navigate to the directory and run:

```bash
# Frontend parts (part1 - part7)
npm run dev

# Backend parts (part3, part4, part9)
npm run dev

# Tests
npm run test
```

## Custom Projects

| Location | Description |
|---|---|
| `sandbox/` | Custom Express server built during Part 0, plus subsequent experimentation |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines, commit conventions, and how to submit issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
