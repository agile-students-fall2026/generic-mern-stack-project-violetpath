export const major = {
  name: 'Computer Science',
  creditsTaken: 48,
  creditsLeft: 16,
  groups: [
    {
      name: 'Computer Science Courses',
      courses: [
        { id: 'c1', code: 'CSCI-UA 2', title: 'Intro to Computer Programming', credits: 4, status: 'completed' },
        { id: 'c2', code: 'CSCI-UA 101', title: 'Intro to Computer Science', credits: 4, status: 'completed' },
        { id: 'c3', code: 'CSCI-UA 102', title: 'Data Structures', credits: 4, status: 'in-progress' },
        { id: 'c4', code: 'CSCI-UA 310', title: 'Algorithms', credits: 4, status: 'not-started' },
      ],
    },
    {
      name: 'Mathematics Courses',
      courses: [
        { id: 'm1', code: 'MATH-UA 102', title: 'Discrete Mathematics', credits: 4, status: 'completed' },
        { id: 'm2', code: 'MATH-UA 121', title: 'Calculus I', credits: 4, status: 'not-started' },
      ],
    },
    {
      name: 'Electives Courses',
      courses: [
        { id: 'e1', code: 'MATH-UA 122', title: 'Calculus II', credits: 4, status: 'completed' },
        { id: 'e2', code: 'CSCI-UA 480', title: 'Computer Networks', credits: 4, status: 'not-started' },
      ],
    },
  ],
};

export const minors = ['Math', 'Physics'];

export const minorDetails = [
  {
    name: 'Math',
    coursesRequired: 8,
    creditsTaken: 12,
    gpa: 3.92,
    courses: [
      { id: 'mm1', code: 'MATH-UA 102', title: 'Discrete Mathematics', credits: 4, status: 'completed' },
      { id: 'mm2', code: 'MATH-UA 121', title: 'Calculus I', credits: 3, status: 'completed' },
      { id: 'mm3', code: 'MATH-UA 122', title: 'Calculus II', credits: 4, status: 'in-progress' },
    ],
  },
  {
    name: 'Physics',
    coursesRequired: 8,
    creditsTaken: 12,
    gpa: 3.92,
    courses: [
      { id: 'pm1', code: 'PHYS-UA 102', title: 'Mechanics', credits: 4, status: 'completed' },
      { id: 'pm2', code: 'PHYS-UA 121', title: 'Dynamics', credits: 3, status: 'completed' },
      { id: 'pm3', code: 'PHYS-UA 122', title: 'Magnetism', credits: 3, status: 'in-progress' },
    ],
  },
];