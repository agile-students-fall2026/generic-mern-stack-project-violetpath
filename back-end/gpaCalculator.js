
const gradePoints = {
  'A': 4.000,
  'A-': 3.667,
  'B+': 3.333,
  'B': 3.000,
  'B-': 2.667,
  'C+': 2.333,
  'C': 2.000,
  'C-': 1.667,
  'D+': 1.333,
  'D': 1.000,
  'F': 0.000
}

const requiredCredits = 128

// Get courses from requirement groups
export function getCourses(groups) {
  const courses = []

  for (const group of groups) {
    for (const course of group.courses) {
      courses.push(course)
    }
  }

  return courses
}

// Get completed courses with valid grades
export function getGradedCourses(courses) {
  const gradedCourses = []

  for (const course of courses) {
    if (
      course.status !== 'completed' ||
      typeof gradePoints[course.grade] !== 'number' ||
      typeof course.credits !== 'number' ||
      !Number.isFinite(course.credits) ||
      course.credits <= 0
    ) {
      continue
    }

    const existing = gradedCourses.find(
      item => item.code === course.code
    )

    if (!existing) {
      gradedCourses.push({
        ...course,
        gradePoint: gradePoints[course.grade]
      })
    }
  }

  return gradedCourses
}

// Calculate GPA using grades and credits
export function calculateGPA(courses) {
  if (courses.length === 0) {
    return null
  }

  let totalPoints = 0
  let totalCredits = 0

  for (const course of courses) {
    totalPoints += course.gradePoint * course.credits
    totalCredits += course.credits
  }

  return Number((totalPoints / totalCredits).toFixed(3))
}

// Calculate earned credits
export function calculateCredits(courses) {
  let credits = 0

  for (const course of getGradedCourses(courses)) {
    if (course.grade !== 'F') {
      credits += course.credits
    }
  }

  return credits
}

// Get all courses from requirements
export function getAllCourses(requirements) {
  return [
    ...getCourses(requirements.major.groups),
    ...getCourses(requirements.core.groups),
    ...requirements.generalElectives.courses,
    ...getCourses(requirements.minorDetails)
  ]
}

// Use the same course record across all requirements
export function normalizeRequirements(requirements) {
  const allCourses = getAllCourses(requirements)
  const gradedCourses = getGradedCourses(allCourses)

  const updateCourse = course => {
    const completed = gradedCourses.find(
      item => item.code === course.code
    )

    if (completed) {
      return {
        ...course,
        status: 'completed',
        grade: completed.grade,
        credits: completed.credits
      }
    }

    const inProgress = allCourses.find(
      item => item.code === course.code &&
        item.status === 'in-progress'
    )

    if (inProgress) {
      return {
        ...course,
        status: 'in-progress',
        grade: null
      }
    }

    return { ...course }
  }

  const updateGroups = groups => {
    return groups.map(group => ({
      ...group,
      courses: group.courses.map(updateCourse)
    }))
  }

  return {
    ...requirements,
    major: {
      ...requirements.major,
      groups: updateGroups(requirements.major.groups)
    },
    core: {
      ...requirements.core,
      groups: updateGroups(requirements.core.groups)
    },
    generalElectives: {
      ...requirements.generalElectives,
      courses: requirements.generalElectives.courses.map(updateCourse)
    },
    minorDetails: updateGroups(requirements.minorDetails)
  }
}

// Calculate credits and GPA for a requirement category
function calculateCategory(courses, totalRequired) {
  const creditsTaken = calculateCredits(courses)

  return {
    creditsTaken: creditsTaken,
    creditsLeft: Math.max(0, totalRequired - creditsTaken),
    creditsRequired: totalRequired,
    gpa: calculateGPA(getGradedCourses(courses))
  }
}

// Calculate updated degree requirements
export function calculateDegreeRequirements(requirements) {
  const data = normalizeRequirements(requirements)

  const major = calculateCategory(
    getCourses(data.major.groups),
    data.major.creditsTaken + data.major.creditsLeft
  )

  const core = calculateCategory(
    getCourses(data.core.groups),
    data.core.creditsTaken + data.core.creditsLeft
  )

  const generalElectives = calculateCategory(
    data.generalElectives.courses,
    data.generalElectives.creditsTaken + data.generalElectives.creditsLeft
  )

  const minorDetails = data.minorDetails.map(minor => ({
    ...minor,
    ...calculateCategory(
      minor.courses,
      minor.creditsTaken + minor.creditsLeft
    ),
    listedCourses: minor.courses.length,
    listedCoursesLeft: minor.courses.filter(
      course => course.status !== 'completed' ||
        course.grade === 'F'
    ).length
  }))

  return {
    ...data,
    major: {
      ...data.major,
      ...major
    },
    core: {
      ...data.core,
      ...core
    },
    generalElectives: {
      ...data.generalElectives,
      ...generalElectives
    },
    minorDetails: minorDetails
  }
}

// Calculate academic summary
export function calculateAcademicSummary(requirements) {
  const data = normalizeRequirements(requirements)

  const majorCourses = getCourses(data.major.groups)
  const coreCourses = getCourses(data.core.groups)
  const generalCourses = data.generalElectives.courses
  const minorCourses = getCourses(data.minorDetails)

  const allCourses = getAllCourses(data)
  const gradedCourses = getGradedCourses(allCourses)

  const creditsTaken = calculateCredits(allCourses)

  let gpaCredits = 0

  for (const course of gradedCourses) {
    gpaCredits += course.credits
  }

  return {
    cumulativeGPA: calculateGPA(gradedCourses),
    majorGPA: calculateGPA(getGradedCourses(majorCourses)),
    minorGPA: calculateGPA(getGradedCourses(minorCourses)),
    coreGPA: calculateGPA(getGradedCourses(coreCourses)),
    generalElectivesGPA: calculateGPA(getGradedCourses(generalCourses)),
    creditsTaken: creditsTaken,
    creditsLeft: Math.max(0, requiredCredits - creditsTaken),
    creditsRequired: requiredCredits,
    gpaCredits: gpaCredits,
    major: data.major.name,
    minors: data.minors
  }
}

// Get unique in-progress courses
export function getInProgressCourses(requirements) {
  const data = normalizeRequirements(requirements)
  const allCourses = getAllCourses(data)
  const courses = []

  for (const course of allCourses) {
    const existing = courses.find(
      item => item.code === course.code
    )

    if (course.status === 'in-progress' && !existing) {
      courses.push(course)
    }
  }

  return courses
}

// Calculate graduation credit requirements
export function calculateGraduationCheck(requirements) {
  const summary = calculateAcademicSummary(requirements)
  const data = calculateDegreeRequirements(requirements)

  const groups = [
    {
      key: 'major',
      label: 'Major credits',
      taken: data.major.creditsTaken,
      required: data.major.creditsRequired
    },
    {
      key: 'core',
      label: 'Core credits',
      taken: data.core.creditsTaken,
      required: data.core.creditsRequired
    }
  ]

  for (const minor of data.minorDetails) {
    groups.push({
      key: data.minorDetails.length === 1
        ? 'minor'
        : `minor-${minor.name}`,
      label: data.minorDetails.length === 1
        ? 'Minor credits'
        : `${minor.name} Minor credits`,
      taken: minor.creditsTaken,
      required: minor.creditsRequired
    })
  }

  const coreGroup = groups.splice(1, 1)[0]
  groups.push(coreGroup)

  const creditGroups = groups.map(group => ({
    ...group,
    creditsLeft: Math.max(0, group.required - group.taken),
    completed: group.taken >= group.required
  }))

  return {
    major: summary.major,
    minor: summary.minors.join(', ') || 'None',
    totalCredits: {
      taken: summary.creditsTaken,
      required: summary.creditsRequired
    },
    groups: creditGroups,
    totalCreditsLeft: summary.creditsLeft,
    eligibleByCredits: summary.creditsLeft === 0 &&
      creditGroups.every(group => group.completed)
  }

}
//Calculate required GPA to achieve target GPA
export function calculateTargetGPA(
  currentGPA, 
  targetGPA, 
  completedCredits, 
  futureCredits
) {
  const currentPoints = currentGPA * completedCredits
  const totalCredits = completedCredits + futureCredits
  const targetPoints = targetGPA * totalCredits
  const requiredPoints = targetPoints - currentPoints
  const requiredGPA = requiredPoints/futureCredits

  return {
    requiredGPA: Number(requiredGPA.toFixed(3)),
    achieveable:requiredGPA <= 4 + 1e-9
  }
}