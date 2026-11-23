import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('Student Information API', () => {
  it('should return student information', done => {
    request.execute(app)
      .get('/student-information')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        res.body.should.have.property('firstName')
        res.body.should.have.property('lastName')
        res.body.should.have.property('major')
        res.body.should.have.property('expectedGraduation')
        done()
      })
  })

  it('should save valid student information', done => {
    request.execute(app)
      .get('/student-information')
      .end((err, res) => {
        if (err) return done(err)

        request.execute(app)
          .put('/student-information')
          .send(res.body)
          .end((err, result) => {
            if (err) return done(err)
            result.should.have.status(200)
            result.body.should.have.property('student')
            done()
          })
      })
  })

  it('should reject incomplete student information', done => {
    request.execute(app)
      .put('/student-information')
      .send({ firstName: 'Demo' })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(400)
        done()
      })
  })
})
