import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('POST /signup', () => {
  // valid input
  it('should respond with 200 when all fields are valid', done => {
    request.execute(app)
      .post('/signup')
      .send({ email: 'newstudent@nyu.edu', password: 'Abcde1!', major: 'Computer Science' })
      .end((err, res) => {
        res.should.have.status(200) // use should to make BDD-style assertions
        res.body.should.be.a('object') // our route sends back an object
        res.body.should.have.property('message', 'Signup Successful') // a way to check the exact value of a property of the response object
        done() // resolve the Promise that these tests create so mocha can move on
      })
  })

  // invalid input
  it('should respond with 400 when a field is missing', done => {
    request.execute(app)
      .post('/signup')
      .send({ email: 'newstudent@nyu.edu', password: 'Abcde1!' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'All fields are required')
        done()
      })
  })

  it('should respond with 409 when the email already exists', done => {
    request.execute(app)
      .post('/signup')
      .send({ email: 'ab1234@nyu.edu', password: 'Abcde1!', major: 'Computer Science' })
      .end((err, res) => {
        res.should.have.status(409)
        res.body.should.have.property('error', 'An account already exists with this email address')
        done()
      })
  })

  it('should respond with 400 when the email is not an NYU email', done => {
    request.execute(app)
      .post('/signup')
      .send({ email: 'student@gmail.com', password: 'Abcde1!', major: 'Computer Science' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Your email should be a NYU email address')
        done()
      })
  })

  it('should respond with 400 when the password is too short', done => {
    request.execute(app)
      .post('/signup')
      .send({ email: 'newstudent@nyu.edu', password: 'Ab1!', major: 'Computer Science' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Password must be at least 6 characters long.')
        done()
      })
  })

  it('should respond with 400 when the password has no upper case letter', done => {
    request.execute(app)
      .post('/signup')
      .send({ email: 'newstudent@nyu.edu', password: 'abcde1!', major: 'Computer Science' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Password must contain at least one upper case letter')
        done()
      })
  })

  it('should respond with 400 when the password has no lower case letter', done => {
    request.execute(app)
      .post('/signup')
      .send({ email: 'newstudent@nyu.edu', password: 'ABCDE1!', major: 'Computer Science' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Password must contain at least one lower case letter')
        done()
      })
  })

  it('should respond with 400 when the password has no special character', done => {
    request.execute(app)
      .post('/signup')
      .send({ email: 'newstudent@nyu.edu', password: 'Abcde12', major: 'Computer Science' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Password must contain at least one special character')
        done()
      })
  })
})