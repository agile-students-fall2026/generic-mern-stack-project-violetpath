import * as chai from 'chai'
import chaiHttp, { request } from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
chai.should()

describe('GET /degree/graduation', () => {

  // valid response
  it('should respond with HTTP 200 and an object', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })

  it('should return the correct term', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.body.should.have.property('term', 'Spring 2027')
        done()
      })
  })

  it('should return the correct major and minor', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.body.should.have.property('major', 'Computer Science')
        res.body.should.have.property('minor', 'Math')
        done()
      })
  })

  // credit information
  it('should return total credit information', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.body.should.have.property('totalCredits')
        res.body.totalCredits.should.have.property('taken', 100)
        res.body.totalCredits.should.have.property('required', 128)
        done()
      })
  })

  it('should calculate 28 remaining credits', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        const credits = res.body.totalCredits
        const remaining = credits.required - credits.taken

        chai.expect(remaining).to.equal(28)
        done()
      })
  })

  // credit groups
  it('should return three credit groups', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.body.groups.should.be.an('array')
        res.body.groups.should.have.length(3)
        done()
      })
  })

  it('should return major credit information', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.body.groups[0].should.have.property('key', 'major')
        res.body.groups[0].should.have.property('taken', 40)
        res.body.groups[0].should.have.property('required', 48)
        done()
      })
  })

  it('should return minor credit information', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.body.groups[1].should.have.property('key', 'minor')
        res.body.groups[1].should.have.property('taken', 12)
        res.body.groups[1].should.have.property('required', 16)
        done()
      })
  })

  it('should return core credit information', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.body.groups[2].should.have.property('key', 'core')
        res.body.groups[2].should.have.property('taken', 20)
        res.body.groups[2].should.have.property('required', 24)
        done()
      })
  })

  it('should return the correct credit group labels', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.body.groups[0].should.have.property('label', 'Major credits')
        res.body.groups[1].should.have.property('label', 'Minor credits')
        res.body.groups[2].should.have.property('label', 'Core credits')
        done()
      })
  })
it('should return the remaining credits', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.body.totalCreditsLeft.should.equal(28)
        res.body.groups[0].creditsLeft.should.equal(8)
        res.body.groups[1].creditsLeft.should.equal(4)
        res.body.groups[2].creditsLeft.should.equal(4)
        done()
      })
  })

  it('should check if credit requirements are completed', done => {
    request.execute(app)
      .get('/degree/graduation')
      .end((err, res) => {
        res.body.should.have.property('eligibleByCredits', false)
        res.body.groups[0].completed.should.equal(false)
        res.body.groups[1].completed.should.equal(false)
        res.body.groups[2].completed.should.equal(false)
        done()
      })
  })
})
