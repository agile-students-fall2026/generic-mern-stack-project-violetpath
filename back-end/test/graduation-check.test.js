import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import fs from 'fs'
import app from '../app.js'
import {
  calculateGraduationCheck
} from '../gpaCalculator.js'

chai.use(chaiHttp)
chai.should()

describe('GET /degree/graduation', () => {
  let response
  let expected
  let student

  before(async () => {
    const requirements = JSON.parse(
      fs.readFileSync(
        new URL('../mock-data/requirements.json', import.meta.url),
        'utf8'
      )
    )

    student = JSON.parse(
      fs.readFileSync(
        new URL('../mock-data/student.json', import.meta.url),
        'utf8'
      )
    )

    expected = calculateGraduationCheck(requirements)

    response = await request.execute(app)
      .get('/degree/graduation')
  })

  it('should respond with HTTP 200 and an object', () => {
    response.should.have.status(200)
    response.body.should.be.a('object')
  })

  it('should return the graduation term', () => {
    response.body.term.should.equal(
      student.expectedGraduation
    )
  })

  it('should return major and minor information', () => {
    response.body.major.should.equal(expected.major)
    response.body.minor.should.equal(expected.minor)
  })

  it('should return calculated total credits', () => {
    response.body.totalCredits.should.deep.equal(
      expected.totalCredits
    )
  })

  it('should return calculated credit groups', () => {
    response.body.groups.should.deep.equal(
      expected.groups
    )
  })

  it('should return calculated remaining credits', () => {
    response.body.totalCreditsLeft.should.equal(
      expected.totalCreditsLeft
    )
  })

  it('should return graduation credit eligibility', () => {
    response.body.eligibleByCredits.should.equal(
      expected.eligibleByCredits
    )
  })

  it('should use the same credits as the GPA API', async () => {
    const gpaResponse = await request.execute(app)
      .get('/degree-progress/gpa')

    gpaResponse.should.have.status(200)

    response.body.totalCredits.taken.should.equal(
      gpaResponse.body.creditsTaken
    )

    response.body.totalCredits.required.should.equal(
      gpaResponse.body.creditsRequired
    )

    response.body.totalCreditsLeft.should.equal(
      gpaResponse.body.creditsLeft
    )

    response.body.major.should.equal(
      gpaResponse.body.major
    )

    response.body.minor.should.equal(
      gpaResponse.body.minors.join(', ') || 'None'
    )
  })
})