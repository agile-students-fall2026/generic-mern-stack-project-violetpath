## 1. Team Norms

- **Communication:** Team members should communicate regularly on Discord and respond to important updates promptly (within 24 hours).
- **Participation:** All team members are expected to participate in meetings, discussions, and development activities.
- **Responsibility:** Each team member is responsible for completing assigned tasks by the agreed deadlines.
- **Collaboration:** We encourage team members to share ideas, ask questions, and help each other solve problems.
- **Respect:** All team members should respect different perspectives and provide constructive feedback.
- **Transparency:** Any difficulties or delays should be communicated to the team as early as possible.
Standup times are fixed to Tuesday: 9:45 pm, Friday: 4 pm, Sunday: 8pm over Zoom. Everyone will attend synchronously and share their progress, next steps, and blockers. For emergencies, contact professor or course assistant. 

## 2. Git Workflow

Our team uses GitHub to collaborate and manage code changes.

1. Clone the team repository to your local computer.
2. Pull the latest changes from the `master` branch before starting work.
3. Create a new branch for each feature or task.
4. Make changes and commit them with clear, descriptive commit messages.
5. Push your branch to GitHub.
6. Create a pull request to merge changes into `master`.
7. Request a review from at least one teammate on Discord.
8. Merge the pull request after receiving approval.

All contributions must be reviewed and approved by a teammate on Discord before merging into the main development branch.

## 3. Contribution Rules

All team members are encouraged to contribute to the development of our project.

- Work on assigned tasks and communicate progress with the team.
- Follow the existing project structure and coding conventions.
- Write clear and meaningful commit messages.
- Test code before submitting a pull request.
- Avoid making unnecessary changes to unrelated files.
- Review teammates' contributions and provide constructive feedback.
- Discuss major changes with the team before implementing them.

## 4. Local Development Setup

Our project uses the MERN stack: MongoDB, Express.js, React, and Node.js.

### Clone the Repository

```bash
git clone https://github.com/agile-students-fall2026/violent-path-mern-stack-project.git
```

Navigate into the project directory:

```bash
cd violent-path-mern-stack-project
```

### Install Dependencies

Install the dependencies for both the back-end and front-end:

```bash
cd back-end
npm install

cd ../front-end
npm install
```

Follow the project's README for any additional environment configuration.

## 5. Building and Testing

Team members should ensure their changes work correctly before submitting a pull request.

### Running the Application

- Start any required database services.
- Follow the instructions in the project's README and `package.json` files to run the back-end and front-end applications.
- Verify that the application starts without errors.

### Testing

Before submitting changes:

1. Test any new features or modifications.
2. Verify that existing functionality still works.
3. Check for errors in the terminal and browser console.
4. Run any automated tests available in the project.
5. Request a teammate's review before merging changes.
