import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('POST /forgot-password', () => {
  // valid input
  it('should respond with 200 when the email exists and the new password is valid', done => {
    request.execute(app)
      .post('/forgot-password')
      .send({ email: 'ab1234@nyu.edu', newPassword: 'Newpass1!' })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message', 'Password Reset Successful')
        done()
      })
  })

  // invalid input
  it('should respond with 400 when a field is missing', done => {
    request.execute(app)
      .post('/forgot-password')
      .send({ email: 'ab1234@nyu.edu' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Missing email or password')
        done()
      })
  })

  it('should respond with 404 when the email does not exist', done => {
    request.execute(app)
      .post('/forgot-password')
      .send({ email: 'nobody@nyu.edu', newPassword: 'Newpass1!' })
      .end((err, res) => {
        res.should.have.status(404)
        res.body.should.have.property('error', 'Email not found')
        done()
      })
  })

  it('should respond with 400 when the new password is too short', done => {
    request.execute(app)
      .post('/forgot-password')
      .send({ email: 'ab1234@nyu.edu', newPassword: 'Ab1!' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Password must be at least 6 characters long.')
        done()
      })
  })

  it('should respond with 400 when the new password has no number', done => {
    request.execute(app)
      .post('/forgot-password')
      .send({ email: 'ab1234@nyu.edu', newPassword: 'Abcdef!' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Password must contain at least one number')
        done()
      })
  })

  it('should respond with 400 when the new password has no upper case letter', done => {
    request.execute(app)
      .post('/forgot-password')
      .send({ email: 'ab1234@nyu.edu', newPassword: 'abcde1!' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Password must contain at least one upper case letter')
        done()
      })
  })

  it('should respond with 400 when the new password has no lower case letter', done => {
    request.execute(app)
      .post('/forgot-password')
      .send({ email: 'ab1234@nyu.edu', newPassword: 'ABCDE1!' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Password must contain at least one lower case letter')
        done()
      })
  })

  it('should respond with 400 when the new password has no special character', done => {
    request.execute(app)
      .post('/forgot-password')
      .send({ email: 'ab1234@nyu.edu', newPassword: 'Abcde12' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Password must contain at least one special character')
        done()
      })
  })
})