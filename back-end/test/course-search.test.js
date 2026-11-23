import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('Course Search API', () => {
  it('should return HTTP 200', done => {
    request.execute(app)
      .get('/api/courses')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })

  it('should return a list of courses', done => {
    request.execute(app)
      .get('/api/courses')
      .end((err, res) => {
        if (err) return done(err)
        res.body.should.be.an('array')
        chai.expect(res.body.length).to.be.greaterThan(0)
        done()
      })
  })

  it('should return course information', done => {
    request.execute(app)
      .get('/api/courses')
      .end((err, res) => {
        if (err) return done(err)

        const course = res.body[0]
        course.should.have.property('code')
        course.should.have.property('name')
        course.should.have.property('school')
        course.should.have.property('career')
        done()
      })
  })

  it('should include Data Structures', done => {
    request.execute(app)
      .get('/api/courses')
      .end((err, res) => {
        if (err) return done(err)

        const course = res.body.find(c => c.code === 'CSCI-UA 102')
        chai.expect(course).to.exist
        chai.expect(course.name).to.equal('Data Structures')
        done()
      })
  })
})
