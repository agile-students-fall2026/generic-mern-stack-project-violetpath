import { expect } from 'chai'
import {
  calculateGPA,
  getGradedCourses,
  calculateAcademicSummary,
  calculateCredits,
  normalizeRequirements,
  calculateDegreeRequirements,
  getInProgressCourses,
  calculateGraduationCheck
} from '../gpaCalculator.js'

describe('GPA Calculator', () => {

  describe('calculateGPA', () => {

    it('should calculate GPA correctly', () => {
      const courses = [
        { credits: 4, gradePoint: 4.000 },
        { credits: 4, gradePoint: 3.000 }
      ]

      expect(calculateGPA(courses)).to.equal(3.5)
    })

    it('should calculate GPA using different credit values', () => {
      const courses = [
        { credits: 4, gradePoint: 4.000 },
        { credits: 2, gradePoint: 3.000 }
      ]

      expect(calculateGPA(courses)).to.equal(3.667)
    })

    it('should include failing grades in GPA', () => {
      const courses = [
        { credits: 4, gradePoint: 4.000 },
        { credits: 4, gradePoint: 0.000 }
      ]

      expect(calculateGPA(courses)).to.equal(2)
    })

    it('should return null when there are no courses', () => {
      expect(calculateGPA([])).to.equal(null)
    })

  })

  describe('getGradedCourses', () => {

    it('should convert letter grades to grade points', () => {
      const courses = [
        { code: 'CS1', credits: 4, status: 'completed', grade: 'A-' },
        { code: 'CS2', credits: 4, status: 'completed', grade: 'B+' }
      ]

      const result = getGradedCourses(courses)

      expect(result[0].gradePoint).to.equal(3.667)
      expect(result[1].gradePoint).to.equal(3.333)
    })

    it('should exclude courses that are not completed', () => {
      const courses = [
        { code: 'CS1', credits: 4, status: 'in-progress', grade: null },
        { code: 'CS2', credits: 4, status: 'not-started', grade: null }
      ]

      expect(getGradedCourses(courses)).to.have.length(0)
    })

    it('should exclude invalid grades', () => {
      const courses = [
        { code: 'CS1', credits: 4, status: 'completed', grade: 'X' },
        { code: 'CS2', credits: 4, status: 'completed', grade: null }
      ]

      expect(getGradedCourses(courses)).to.have.length(0)
    })

    it('should exclude invalid credit values', () => {
      const courses = [
        { code: 'CS1', credits: 0, status: 'completed', grade: 'A' },
        { code: 'CS2', credits: -4, status: 'completed', grade: 'A' },
        { code: 'CS3', credits: '4', status: 'completed', grade: 'A' }
      ]

      expect(getGradedCourses(courses)).to.have.length(0)
    })

    it('should not count duplicate courses twice', () => {
      const courses = [
        { code: 'CS1', credits: 4, status: 'completed', grade: 'A' },
        { code: 'CS1', credits: 4, status: 'completed', grade: 'A' }
      ]

      expect(getGradedCourses(courses)).to.have.length(1)
    })

  })

  describe('calculateAcademicSummary', () => {

    it('should calculate GPA and credits for each category', () => {
      const requirements = {
        major: {
          groups: [
            {
              courses: [
                { code: 'CS1', credits: 4, status: 'completed', grade: 'A' }
              ]
            }
          ]
        },
        core: {
          groups: [
            {
              courses: [
                { code: 'CORE1', credits: 4, status: 'completed', grade: 'B' }
              ]
            }
          ]
        },
        generalElectives: {
          courses: [
            { code: 'GE1', credits: 4, status: 'completed', grade: 'C' }
          ]
        },
        minorDetails: [
          {
            courses: [
              { code: 'MATH1', credits: 4, status: 'completed', grade: 'B' }
            ]
          }
        ]
      }

      const result = calculateAcademicSummary(requirements)

      expect(result.cumulativeGPA).to.equal(3)
      expect(result.majorGPA).to.equal(4)
      expect(result.minorGPA).to.equal(3)
      expect(result.coreGPA).to.equal(3)
      expect(result.generalElectivesGPA).to.equal(2)
      expect(result.creditsTaken).to.equal(16)
      expect(result.creditsLeft).to.equal(112)
      expect(result.gpaCredits).to.equal(16)
    })

    it('should not count failed courses as earned credits', () => {
      const requirements = {
        major: {
          groups: [
            {
              courses: [
                { code: 'CS1', credits: 4, status: 'completed', grade: 'A' },
                { code: 'CS2', credits: 4, status: 'completed', grade: 'F' }
              ]
            }
          ]
        },
        core: { groups: [] },
        generalElectives: { courses: [] },
        minorDetails: []
      }

      const result = calculateAcademicSummary(requirements)

      expect(result.cumulativeGPA).to.equal(2)
      expect(result.creditsTaken).to.equal(4)
      expect(result.gpaCredits).to.equal(8)
      expect(result.creditsLeft).to.equal(124)
    })

    it('should count courses shared by major and minor only once', () => {
      const course = {
        code: 'MATH1',
        credits: 4,
        status: 'completed',
        grade: 'A'
      }

      const requirements = {
        major: {
          groups: [
            { courses: [course] }
          ]
        },
        core: { groups: [] },
        generalElectives: { courses: [] },
        minorDetails: [
          { courses: [course] }
        ]
      }

      const result = calculateAcademicSummary(requirements)

      expect(result.majorGPA).to.equal(4)
      expect(result.minorGPA).to.equal(4)
      expect(result.cumulativeGPA).to.equal(4)
      expect(result.creditsTaken).to.equal(4)
      expect(result.gpaCredits).to.equal(4)
    })

    it('should handle empty course data', () => {
      const requirements = {
        major: { groups: [] },
        core: { groups: [] },
        generalElectives: { courses: [] },
        minorDetails: []
      }

      const result = calculateAcademicSummary(requirements)

      expect(result.cumulativeGPA).to.equal(null)
      expect(result.majorGPA).to.equal(null)
      expect(result.minorGPA).to.equal(null)
      expect(result.creditsTaken).to.equal(0)
      expect(result.creditsLeft).to.equal(128)
    })

  })
})
describe('Shared Academic Calculations', () => {
  let requirements

  beforeEach(() => {
    requirements = {
      major: {
        name: 'Computer Science',
        creditsTaken: 4,
        creditsLeft: 4,
        groups: [
          {
            name: 'Major Courses',
            courses: [
              {
                code: 'CS1',
                credits: 4,
                status: 'completed',
                grade: 'A'
              },
              {
                code: 'MATH1',
                credits: 4,
                status: 'not-started',
                grade: null
              }
            ]
          }
        ]
      },

      core: {
        name: 'Core',
        creditsTaken: 0,
        creditsLeft: 4,
        groups: [
          {
            name: 'Core Courses',
            courses: [
              {
                code: 'CORE1',
                credits: 4,
                status: 'in-progress',
                grade: null
              }
            ]
          }
        ]
      },

      generalElectives: {
        name: 'General Electives',
        creditsTaken: 0,
        creditsLeft: 0,
        courses: []
      },

      minors: ['Math'],

      minorDetails: [
        {
          name: 'Math',
          creditsTaken: 4,
          creditsLeft: 0,
          courses: [
            {
              code: 'MATH1',
              credits: 4,
              status: 'completed',
              grade: 'B'
            }
          ]
        }
      ]
    }
  })

  it('should calculate earned credits without duplicates', () => {
    const courses = [
      { code: 'CS1', credits: 4, status: 'completed', grade: 'A' },
      { code: 'CS1', credits: 4, status: 'completed', grade: 'A' },
      { code: 'CS2', credits: 4, status: 'completed', grade: 'F' }
    ]

    expect(calculateCredits(courses)).to.equal(4)
  })

  it('should share completed course records across requirements', () => {
    const result = normalizeRequirements(requirements)
    const course = result.major.groups[0].courses[1]

    expect(course.status).to.equal('completed')
    expect(course.grade).to.equal('B')
  })

  it('should not modify the original requirements', () => {
    normalizeRequirements(requirements)

    const course = requirements.major.groups[0].courses[1]

    expect(course.status).to.equal('not-started')
    expect(course.grade).to.equal(null)
  })

  it('should calculate consistent major and minor GPA', () => {
    const result = calculateAcademicSummary(requirements)

    expect(result.cumulativeGPA).to.equal(3.5)
    expect(result.majorGPA).to.equal(3.5)
    expect(result.minorGPA).to.equal(3)
    expect(result.creditsTaken).to.equal(8)
    expect(result.gpaCredits).to.equal(8)
  })

  it('should return major and minor names', () => {
    const result = calculateAcademicSummary(requirements)

    expect(result.major).to.equal('Computer Science')
    expect(result.minors).to.deep.equal(['Math'])
  })

  it('should calculate updated degree requirements', () => {
    const result = calculateDegreeRequirements(requirements)

    expect(result.major.creditsTaken).to.equal(8)
    expect(result.major.creditsLeft).to.equal(0)
    expect(result.major.gpa).to.equal(3.5)

    expect(result.minorDetails[0].creditsTaken).to.equal(4)
    expect(result.minorDetails[0].creditsLeft).to.equal(0)
    expect(result.minorDetails[0].gpa).to.equal(3)
    expect(result.minorDetails[0].listedCourses).to.equal(1)
    expect(result.minorDetails[0].listedCoursesLeft).to.equal(0)
  })

  it('should return only in-progress courses', () => {
    const result = getInProgressCourses(requirements)

    expect(result).to.have.length(1)
    expect(result[0].code).to.equal('CORE1')
  })

  it('should exclude completed courses from in-progress courses', () => {
    requirements.major.groups[0].courses[1].status = 'in-progress'

    const result = getInProgressCourses(requirements)

    expect(result.map(course => course.code))
      .to.not.include('MATH1')
  })

  it('should calculate graduation credits using the academic summary', () => {
    const result = calculateGraduationCheck(requirements)

    expect(result.totalCredits.taken).to.equal(8)
    expect(result.totalCredits.required).to.equal(128)
    expect(result.totalCreditsLeft).to.equal(120)
    expect(result.eligibleByCredits).to.equal(false)
  })

  it('should calculate remaining credits for each graduation group', () => {
    const result = calculateGraduationCheck(requirements)

    const major = result.groups.find(
      group => group.key === 'major'
    )

    const core = result.groups.find(
      group => group.key === 'core'
    )

    expect(major.creditsLeft).to.equal(0)
    expect(major.completed).to.equal(true)

    expect(core.creditsLeft).to.equal(4)
    expect(core.completed).to.equal(false)
  })
})
