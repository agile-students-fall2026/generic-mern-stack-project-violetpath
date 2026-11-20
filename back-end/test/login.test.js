import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('POST /login', () => {
  // valid input
  it('should respond with 200 when the email and password are correct', done => {
    request.execute(app)
      .post('/login')
      .send({ email: 'ab1234@nyu.edu', password: 'Vp1234!' })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('message', 'Login Successful')
        done()
      })
  })

  // invalid input
  it('should respond with 400 when the email is missing', done => {
    request.execute(app)
      .post('/login')
      .send({ password: 'Abcde1!' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Missing email or password')
        done()
      })
  })

  it('should respond with 400 when the password is missing', done => {
    request.execute(app)
      .post('/login')
      .send({ email: 'aq1234@nyu.edu' })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('error', 'Missing email or password')
        done()
      })
  })

  it('should respond with 401 when the email does not exist', done => {
    request.execute(app)
      .post('/login')
      .send({ email: 'nobody@nyu.edu', password: 'Abcde1!' })
      .end((err, res) => {
        res.should.have.status(401)
        res.body.should.have.property('error', 'Invalid email or password')
        done()
      })
  })

  it('should respond with 401 when the password is wrong', done => {
    request.execute(app)
      .post('/login')
      .send({ email: 'ab1234@nyu.edu', password: 'Wrongpass1!' })
      .end((err, res) => {
        res.should.have.status(401)
        res.body.should.have.property('error', 'Invalid email or password')
        done()
      })
  })
})