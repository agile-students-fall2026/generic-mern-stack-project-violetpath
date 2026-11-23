# VioletPath Backend

This is the back-end for VioletPath, a degree planner and GPA calculator for NYU students.

It uses Node.js and Express.js to handle API requests. Some features currently use mock JSON data.

## What you need

- Node.js
- npm (comes with Node.js)
- Git

## How to run it

1. Clone the repo

```bash
git clone https://github.com/agile-students-fall2026/generic-mern-stack-project-violetpath.git
cd generic-mern-stack-project-violetpath/back-end
```

2. Install the packages

```bash
npm install
```

3. Start the backend

```bash
npm start
```

For development with automatic restarts, use `npm run dev` instead.

To stop the server, press `Ctrl + C`.

## How to test it

Run all backend tests:

```bash
npm test
```

Run a specific test:

```bash
npx mocha test/graduation-check.test.js
```

Check test coverage:

```bash
npm run coverage
```

## API Features

The backend includes APIs for:

- Login, signup, and password reset
- Target GPA calculation
- Degree progress and requirements
- Graduation check
- Degree declaration

Some APIs currently return mock data.

## More information

See the [main README](../README.md) for the overall project description.