import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('POST /calculate-target-gpa', () => {

  it('should calculate the required GPA correctly', done => {
    request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 3.5,
        targetGPA: 3.7,
        completedCredits: 60,
        futureCredits: 30
      })
      .end((err, res) => {
        try {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('requiredGPA', 4.1)
          res.body.should.have.property('achievable', false)
          done()
        } catch (error) {
          done(error)
        }
      })
  })

  it('should return true for an achievable target GPA', done => {
    request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 3.0,
        targetGPA: 3.5,
        completedCredits: 60,
        futureCredits: 60
      })
      .end((err, res) => {
        try {
          res.should.have.status(200)
          res.body.should.have.property('requiredGPA', 4)
          res.body.should.have.property('achievable', true)
          done()
        } catch (error) {
          done(error)
        }
      })
  })

  it('should return 400 when a required field is missing', done => {
    request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 3.5,
        targetGPA: 3.7,
        completedCredits: 60
      })
      .end((err, res) => {
        try {
          res.should.have.status(400)
          res.body.should.have.property('error')
          done()
        } catch (error) {
          done(error)
        }
      })
  })

  it('should return 400 when GPA is greater than 4', done => {
    request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 4.5,
        targetGPA: 3.7,
        completedCredits: 60,
        futureCredits: 30
      })
      .end((err, res) => {
        try {
          res.should.have.status(400)
          res.body.should.have.property('error')
          done()
        } catch (error) {
          done(error)
        }
      })
  })

  it('should return 400 for a non-numeric GPA', done => {
    request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 'hello',
        targetGPA: 3.7,
        completedCredits: 60,
        futureCredits: 30
      })
      .end((err, res) => {
        try {
          res.should.have.status(400)
          res.body.should.have.property('error')
          done()
        } catch (error) {
          done(error)
        }
      })
  })

  it('should return 400 when future credits are zero', done => {
    request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 3.5,
        targetGPA: 3.7,
        completedCredits: 60,
        futureCredits: 0
      })
      .end((err, res) => {
        try {
          res.should.have.status(400)
          res.body.should.have.property('error')
          done()
        } catch (error) {
          done(error)
        }
      })
  })

  it('should return 400 for negative credits', done => {
    request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 3.5,
        targetGPA: 3.7,
        completedCredits: -10,
        futureCredits: 30
      })
      .end((err, res) => {
        try {
          res.should.have.status(400)
          res.body.should.have.property('error')
          done()
        } catch (error) {
          done(error)
        }
      })
  })

})