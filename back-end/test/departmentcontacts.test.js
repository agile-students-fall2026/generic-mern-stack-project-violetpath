import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('GET /api/departments', () => {
  it('should respond with 200 when departments are retrieved successfully', done => {
    request.execute(app)
      .get('/api/departments')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        done()
      })
 })
  it('should return departments with name and website', done => {
    request.execute(app)
      .get('/api/departments')
      .end((err, res) => {
        res.should.have.status(200)
        res.body[0].should.have.property('name')
        res.body[0].should.have.property('website')
        done()
      })
  })
  it('should return at least one department', done => {
    request.execute(app)
      .get('/api/departments')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.length.greaterThan(0)
        done()
      })
  })
   it('should respond with 404 when the endpoint does not exist', done => {
    request.execute(app)
      .get('/api/invalid-departments')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
  })
 })
