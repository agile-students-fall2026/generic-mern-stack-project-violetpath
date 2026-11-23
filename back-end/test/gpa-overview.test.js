import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('GPA Overview Calculation API', () => {
  it('should calculate GPA correctly', done => {
    request.execute(app)
      .post('/gpa-overview/calculate')
      .send({
        courses: [
          { credits: 4, gradePoint: 4.0, type: 'major' },
          { credits: 4, gradePoint: 3.0, type: 'minor' },
          { credits: 2, gradePoint: 3.7, type: 'other' }
        ]
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('cumulativeGPA', 3.54)
        res.body.should.have.property('majorGPA', 4)
        res.body.should.have.property('minorGPA', 3)
        res.body.should.have.property('creditsTaken', 10)
        done(err)
      })
  })

  it('should reject invalid credits', done => {
    request.execute(app)
      .post('/gpa-overview/calculate')
      .send({
        courses: [
          { credits: 0, gradePoint: 4.0, type: 'major' }
        ]
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Invalid course information')
        done(err)
      })
  })

  it('should reject missing course data', done => {
    request.execute(app)
      .post('/gpa-overview/calculate')
      .send({})
      .end((err, res) => {
        res.should.have.status(400)
        done(err)
      })
  })

  it('should reject invalid grade points', done => {
    request.execute(app)
      .post('/gpa-overview/calculate')
      .send({
        courses: [
          { credits: 4, gradePoint: 5.0, type: 'major' }
        ]
      })
      .end((err, res) => {
        res.should.have.status(400)
        done(err)
      })
  })
})
