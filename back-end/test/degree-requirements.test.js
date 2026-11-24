import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import fs from 'fs'
import app from '../app.js'
import {
  calculateDegreeRequirements
} from '../gpaCalculator.js'

chai.use(chaiHttp)
chai.should()

describe('GET /degree/requirements', () => {
  let response
  let expected

  before(async () => {
    const requirements = JSON.parse(
      fs.readFileSync(
        new URL('../mock-data/requirements.json', import.meta.url),
        'utf8'
      )
    )

    expected = calculateDegreeRequirements(requirements)

    response = await request.execute(app)
      .get('/degree/requirements')
  })

  it('should respond with HTTP 200 and an object', () => {
    response.should.have.status(200)
    response.body.should.be.a('object')
  })

  it('should return major information', () => {
    response.body.major.name.should.equal(
      expected.major.name
    )
  })

  it('should return calculated major credits', () => {
    response.body.major.creditsTaken.should.equal(
      expected.major.creditsTaken
    )

    response.body.major.creditsLeft.should.equal(
      expected.major.creditsLeft
    )
  })

  it('should return major course groups', () => {
    response.body.major.groups.should.deep.equal(
      expected.major.groups
    )
  })

  it('should return valid course status', () => {
    const statuses = [
      'completed',
      'in-progress',
      'not-started'
    ]

    for (const group of response.body.major.groups) {
      for (const course of group.courses) {
        statuses.should.include(course.status)
        course.code.should.be.a('string')
        course.title.should.be.a('string')
        course.credits.should.be.a('number')
      }
    }
  })

  it('should return the list of minors', () => {
    response.body.minors.should.deep.equal(
      expected.minors
    )
  })

  it('should return calculated minor details', () => {
    response.body.minorDetails.should.deep.equal(
      expected.minorDetails
    )
  })

  it('should return calculated major GPA', () => {
    chai.expect(response.body.major.gpa)
      .to.equal(expected.major.gpa)
  })

  it('should return core curriculum information', () => {
    response.body.core.should.deep.equal(
      expected.core
    )
  })

  it('should return general elective information', () => {
    response.body.generalElectives.should.deep.equal(
      expected.generalElectives
    )
  })
})