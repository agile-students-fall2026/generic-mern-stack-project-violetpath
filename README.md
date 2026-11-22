# VioletPath: NYU Degree Planner and GPA Calculator

VioletPath is a **mobile-friendly web application** designed to help New York University (NYU) students understand their degree progress, plan future coursework, and explore possible GPA outcomes.

## Project Overview

### What and Why?

Planning a degree at NYU can be challenging, especially for students pursuing double majors, minors, or programs involving transfer credits.

Students often need to compare transcripts, degree worksheets, department websites, course catalogs, prerequisite requirements, and semester schedules. This fragmented process can lead to missed requirements, unnecessary courses, scheduling conflicts, and delayed graduation.

VioletPath aims to simplify academic planning by organizing academic records, degree requirements, course planning, and GPA projections in one accessible platform.

The application is intended to support, rather than replace, official academic advising.

### Product Vision Statement

Our vision is to provide NYU undergraduate students with a centralized, intuitive, and accessible platform that simplifies academic planning and helps them make informed decisions about their education.

VioletPath will enable students to understand their academic progress, identify remaining graduation requirements, explore relevant courses, plan future semesters, and estimate potential GPA outcomes.

Our Minimum Viable Product (MVP) will prioritize essential academic record management, degree requirement tracking, and basic GPA planning for a limited selection of NYU College of Arts and Science programs.

By focusing on these core capabilities, we aim to deliver a usable application, gather feedback from real students, and iteratively improve the product through Agile development.

## Who Is It For?

Our initial users are NYU undergraduate students, particularly those in the College of Arts and Science (CAS), including students with majors, minors, transfer credits, or different expected graduation dates.

We plan to seek feedback from NYU students through interviews and usability testing. Academic advisors may benefit indirectly when students arrive with organized academic records and draft course plans.

## Planned Features

### Academic Records

- **Academic Profile Setup**
  - Allow students to select their NYU school, major(s), minor(s), and expected graduation term.
  - Maintain academic information in a centralized student profile.

- **Manual Course Entry**
  - Allow students to manually enter completed or in-progress courses.
  - Record course codes, titles, academic terms, credits, and grades.
  - Allow students to review and correct course information.

- **Transcript Upload and Review**
  - Allow students to upload academic transcripts.
  - Extract relevant academic information from uploaded transcripts.
  - Present extracted information for user confirmation and correction.

### Degree Progress

- **Degree Requirement Tracking**
  - Display completed, in-progress, and remaining graduation requirements.
  - Track completed and outstanding credits.
  - Help students identify requirements needed for graduation.

- **Course-to-Requirement Mapping**
  - Identify which courses satisfy specific degree requirements.
  - Explain how completed coursework contributes toward graduation.
  - Help students understand when courses may satisfy multiple requirements.

### Course Planning

- **Course Exploration and Recommendations**
  - Allow students to browse relevant courses.
  - Display course descriptions, prerequisites, and credits.
  - Recommend courses based on remaining requirements and completed prerequisites.
  - Provide explanations for course recommendations.

- **Semester Planning and Validation**
  - Allow students to create semester-by-semester academic plans.
  - Compare alternative course schedules.
  - Identify potential prerequisite and credit-load conflicts.
  - Detect scheduling conflicts when reliable course section data is available.

### GPA Planning

- **GPA Calculation and Scenarios**
  - Calculate cumulative GPA using applicable course grades and credits.
  - Allow students to enter hypothetical grades for planned courses.
  - Estimate future GPA outcomes.
  - Compare multiple GPA scenarios.

### Academic Advising

- **Academic Advising Summary**
  - Summarize completed and remaining degree requirements.
  - Organize proposed future coursework.
  - Highlight unresolved planning questions.
  - Help students prepare for academic advising appointments.

## Proposed MVP Scope

To keep the first usable version achievable within one semester, we propose prioritizing:

1. **Manual Academic Record Entry**
   - Students can enter and correct courses, terms, credits, and grades.

2. **Degree Requirement Tracking**
   - Students can view completed and remaining requirements for a limited selection of NYU CAS programs.
   - Students can identify which courses satisfy specific requirements.

3. **Basic GPA Planning**
   - Students can calculate their current GPA from confirmed records.
   - Students can explore projected GPA outcomes using hypothetical grades.

4. **Mobile-Friendly User Interface**
   - Students can access and navigate the core academic planning features on mobile devices.

The proposed MVP scope is subject to confirmation by the Product Owner and development team during sprint planning.

## Potential Later Iterations

Depending on user feedback, implementation progress, and data availability, future iterations may include:

- Automated transcript parsing with user confirmation.
- Advanced course recommendations and prerequisite validation.
- Multi-semester planning and section-level schedule conflict detection.
- Broader NYU school and program coverage.
- Exportable academic advising summaries.

The initial release will not attempt automatic enrollment, guaranteed graduation certification, or comprehensive handling of every academic exception.



## Team Members

| Nickname | GitHub Profile |
| --- | --- |
| ksjoh03 | [ksjoh03](https://github.com/ksjoh03) |
| gswon | [gswon](https://github.com/gswon) |
| hoorsakrr | [hoorsakrr](https://github.com/hoorsakrr) |
| elineson | [elineson](https://github.com/elineson) |


## Project History

VioletPath originated as a project proposal to address the challenges NYU students face when tracking degree requirements, planning coursework, and estimating GPA outcomes.

The project is being developed as part of New York University's Agile Software Development & DevOps course in Fall 2026.

Our team follows Agile and Scrum practices, organizing development into iterative sprints and managing work through GitHub Issues, GitHub Projects, and Pull Requests.


## Building and Testing

### Prerequisites

To run VioletPath locally, you will need:

- Node.js and npm
- Git

### Clone the Repository

Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/agile-students-fall2026/generic-mern-stack-project-violetpath.git
cd generic-mern-stack-project-violetpath
```

### Run the Back-End

Open a terminal in the project root directory:

```bash
cd back-end
npm install
npm start
```

The back-end is built with Node.js and Express.js and provides REST API endpoints for the application.

### Run the Front-End

Open a second terminal in the project root directory:

```bash
cd front-end
npm install
npm run dev
```

Open the URL displayed by Vite in your browser, typically:

http://localhost:5173/

Both the front-end and back-end should be running to use the integrated application.

### Run Back-End Tests

The project uses Mocha and Chai for back-end testing. Some API tests also use chai-http or Axios.

From the project root:

```bash
cd back-end
npm test
```

To run an individual test file from the `back-end` directory:

```bash
npx mocha test/target-gpa.test.js
```

Test files are located in `back-end/test/`.


### Check Test Coverage

The project uses c8 to measure back-end test coverage.

The course requires each developer to achieve at least 10% code coverage of the back-end code.

To generate a code coverage report, navigate to the `back-end` directory and run:

```bash
npm run coverage
```

This command runs the Mocha test suite with c8 and generates a code coverage report.

### Development Status

VioletPath is under active development. Some back-end endpoints currently return mock JSON data while additional functionality and integration tests are being completed.


## Contributing

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for team collaboration guidelines, development workflow, and contribution requirements.

Our team follows a feature-branch workflow. Changes are developed in separate branches and submitted through Pull Requests for peer review before being merged into the shared repository.


## Additional Resources
- [Product Backlog and User Stories](https://github.com/agile-students-fall2026/generic-mern-stack-project-violetpath/issues)
- [Contribution Guidelines](CONTRIBUTING.md)