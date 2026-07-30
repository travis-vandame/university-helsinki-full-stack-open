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

## Course Progress & Directory Structure

| Directory | Description | Key Deliverables & Labs | Status |
| :--- | :--- | :--- | :---: |
| [`part0/`](part0/) | **Fundamentals of Web Apps**<br>• HTTP protocol & web forms<br>• Single Page App (SPA) core concepts | <ul><li>[Traditional Note Flow](part0/0.4-new-note-traditional-flow.md) </li><li>[SPA Loading Flow](part0/0.5-spa-loading-flow.md) </li><li>[SPA New Note Flow](part0/0.6-spa-new-note-flow.md) </li></ul> | ✔️ |
| [`part1/`](part1/) | **Introduction to React**<br>• Components & JSX nesting<br>• Component state & React hooks | <ul><li>[Course Info App](part1/courseinfo/) </li><li>[UniCafe Feedback App](part1/unicafe/) </li><li>[Anecdotes Voting App](part1/anecdotes/) </li></ul> | ✔️ |
| `part2/` | **Communicating with Servers**<br>• AJAX requests & Axios<br>• Express basics & styling | _Pending start_ | 🔄 |
| `part3/` | **Programming a Server with Express**<br>• RESTful API design<br>• MongoDB & Mongoose schemas | _Pending start_ | ⏳ |
| `part4/` | **Testing Express Servers**<br>• Backend testing with Supertest<br>• User administration & auth | _Pending start_ | ⏳ |
| `part5/` | **Testing React Apps**<br>• Vitest environment setup<br>• Front-end component testing | _Pending start_ | ⏳ |
| `part6/` | **Advanced State Management**<br>• Redux Toolkit slices<br>• useReducer & Context API | _Pending start_ | ⏳ |
| `part7/` | **React Router & Custom Hooks**<br>• Declarative navigation<br>• Webpack configurations | _Pending start_ | ⏳ |
| `part8/` | **GraphQL**<br>• Apollo Server & Client setup<br>• Schemas, queries, & mutations | _Pending start_ | ⏳ |
| `part9/` | **TypeScript**<br>• Type-safe Express backends<br>• Typed React components | _Pending start_ | ⏳ |
| `part10/` | **React Native**<br>• Mobile layout & components<br>• Local storage & native testing | _Pending start_ | ⏳ |
| `part11/` | **CI/CD**<br>• GitHub Actions pipelines<br>• Automated build & deploy | _Pending start_ | ⏳ |
| `part12/` | **Containers**<br>• Dockerizing environments<br>• Multi-container production setups | _Pending start_ | ⏳ |
| `part13/` | **Relational Databases**<br>• Sequelize ORM layers<br>• PostgreSQL database migrations | _Pending start_ | ⏳ |
| `part14/` | **Next.js**<br>• Server-side rendering (SSR)<br>• Modern App Router paradigms | _Pending start_ | ⏳ |

> **Status Legend:**  
> ✔️ Complete &nbsp;|&nbsp; 🔄 In Progress &nbsp;|&nbsp; ⏳ Not Started

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

## Custom Projects & Experimentation

| Sandbox Environment | Project Scope & Stack | Current Branch | Status |
| :--- | :--- | :--- | :---: |
| [`sandbox/`](../../tree/sandbox/sandbox) | **Custom Express Server**<br>• Custom backend built during Part 0 foundations<br>• Ongoing isolated architectural experimentation | [`sandbox` ↗](../../tree/sandbox) | 🔄 |

> **Note:** The experimental playground code is isolated from the main coursework and actively maintained on its own dedicated development branch.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines, commit conventions, and how to submit issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
