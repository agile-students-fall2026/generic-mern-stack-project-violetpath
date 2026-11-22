import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('GET /degree/requirements', () => {

  // valid response
  it('should respond with HTTP 200 and an object', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })

  // major requirements
  it('should return the correct major', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.major.should.have.property('name', 'Computer Science')
        done()
      })
  })

  it('should return major credit information', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.major.should.have.property('creditsTaken', 48)
        res.body.major.should.have.property('creditsLeft', 16)
        done()
      })
  })

  it('should return three major course groups', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.major.groups.should.be.an('array')
        res.body.major.groups.should.have.length(3)
        done()
      })
  })

  it('should return Computer Science courses', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.major.groups[0].should.have.property('name', 'Computer Science Courses')
        res.body.major.groups[0].courses.should.have.length(4)
        done()
      })
  })

  it('should return Mathematics courses', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.major.groups[1].should.have.property('name', 'Mathematics Courses')
        res.body.major.groups[1].courses.should.have.length(2)
        done()
      })
  })

  it('should return elective courses', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.major.groups[2].should.have.property('name', 'Electives Courses')
        res.body.major.groups[2].courses.should.have.length(2)
        done()
      })
  })

  // course information
  it('should return course code and title', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        const course = res.body.major.groups[0].courses[0]

        course.should.have.property('code', 'CSCI-UA 2')
        course.should.have.property('title', 'Intro to Computer Programming')
        done()
      })
  })

  it('should return course credits', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        const course = res.body.major.groups[0].courses[0]

        course.should.have.property('credits', 4)
        done()
      })
  })

  it('should return a completed course status', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.major.groups[0].courses[0].should.have.property('status', 'completed')
        done()
      })
  })

  it('should return an in-progress course status', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.major.groups[0].courses[2].should.have.property('status', 'in-progress')
        done()
      })
  })

  it('should return a not-started course status', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.major.groups[0].courses[3].should.have.property('status', 'not-started')
        done()
      })
  })

  // minor requirements
  it('should return a list of minors', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.minors.should.be.an('array')
        res.body.minors.should.include('Math')
        res.body.minors.should.include('Physics')
        done()
      })
  })

  it('should return two minor details', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.body.minorDetails.should.be.an('array')
        res.body.minorDetails.should.have.length(2)
        done()
      })
  })

  it('should return Math minor information', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        const minor = res.body.minorDetails[0]

        minor.should.have.property('name', 'Math')
        minor.should.have.property('coursesRequired', 8)
        minor.should.have.property('creditsTaken', 12)
        minor.should.have.property('gpa', 3.92)
        done()
      })
  })

  it('should return Physics minor information', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        const minor = res.body.minorDetails[1]

        minor.should.have.property('name', 'Physics')
        minor.should.have.property('coursesRequired', 8)
        minor.should.have.property('creditsTaken', 12)
        minor.should.have.property('gpa', 3.92)
        done()
      })
  })

})