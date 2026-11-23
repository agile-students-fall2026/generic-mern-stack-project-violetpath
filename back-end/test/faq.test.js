import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('GET /api/faqs', () => {
  it('should respond with 200 when FAQs are retrieved successfully', done => {
    request.execute(app)
      .get('/api/faqs')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        done()
      })
  })
  it('should return FAQs with question and answer', done => {
    request.execute(app)
      .get('/api/faqs')
      .end((err, res) => {
        res.should.have.status(200)
        res.body[0].should.have.property('question')
        res.body[0].should.be.property('answer')
        done()
      })
  })
  it('should return at least one FAQ', done => {
    request.execute(app)
      .get('/api/faqs')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.length.greaterThan(0)
        done()
      })
  })
  it('should respond with 404 when the endpoint does not exist', done => {
    request.execute(app)
      .get('/api/invalid-faqs')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
  })
})