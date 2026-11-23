import { expect } from 'chai'
import axios from 'axios'
import app from '../app.js'
import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'

chai.use(chaiHttp)
chai.should()

let server
let baseURL
before(() => {
    server = app.listen(0)
    baseURL = `http://localhost:${server.address().port}`
})

after(() => {
    server.close()
})

describe('Degree Requirements API', () => {
    describe('GET /degree/requirements', () => {
        it('returns the major, the list of minors, and minor details', async () => {
            const res = await axios.get(`${baseURL}/degree/requirements`, { validateStatus: () => true })
            expect(res.status).to.equal(200)
            expect(res.data.major.name).to.equal('Computer Science')
            expect(res.data.major.groups).to.be.an('array').that.is.not.empty
            expect(res.data.minors).to.include('Math')
            expect(res.data.minorDetails).to.have.length(2)
        })

        it('includes course status on each course', async () => {
            const res = await axios.get(`${baseURL}/degree/requirements`, { validateStatus: () => true })
            const firstCourse = res.data.major.groups[0].courses[0]
            expect(firstCourse).to.have.property('code')
            expect(firstCourse).to.have.property('status')
        })
    })
})

describe('GET /degree/requirements', () => {
  it('should respond with HTTP 200 and an object', done => {
    request.execute(app)
      .get('/degree/requirements')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })

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