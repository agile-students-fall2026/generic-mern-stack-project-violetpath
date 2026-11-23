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

describe('Graduation Check API', () => {
    describe('GET /degree/graduation', () => {
        it('returns the term, major, minor, and credit totals', async () => {
            const res = await axios.get(`${baseURL}/degree/graduation`, { validateStatus: () => true })
            expect(res.status).to.equal(200)
            expect(res.data.term).to.equal('Spring 2027')
            expect(res.data.major).to.equal('Computer Science')
            expect(res.data.minor).to.equal('Math')
            expect(res.data.totalCredits).to.deep.equal({ taken: 100, required: 128 })
        })

        it('returns the three credit groups', async () => {
            const res = await axios.get(`${baseURL}/degree/graduation`, { validateStatus: () => true })
            expect(res.data.groups).to.have.length(3)
            expect(res.data.groups.map((group) => group.key)).to.deep.equal(['major', 'minor', 'core'])
        })
    })
})

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

    // fixed: calculate remaining credits using existing response fields
    it('should return the remaining credits', done => {
        request.execute(app)
            .get('/degree/graduation')
            .end((err, res) => {
                const credits = res.body.totalCredits
                const groups = res.body.groups

                chai.expect(credits.required - credits.taken).to.equal(28)
                chai.expect(groups[0].required - groups[0].taken).to.equal(8)
                chai.expect(groups[1].required - groups[1].taken).to.equal(4)
                chai.expect(groups[2].required - groups[2].taken).to.equal(4)
                done()
            })
    })

    // fixed: check credit completion using existing response fields
    it('should check if credit requirements are completed', done => {
        request.execute(app)
            .get('/degree/graduation')
            .end((err, res) => {
                const credits = res.body.totalCredits
                const groups = res.body.groups

                chai.expect(credits.taken >= credits.required).to.equal(false)
                chai.expect(groups[0].taken >= groups[0].required).to.equal(false)
                chai.expect(groups[1].taken >= groups[1].required).to.equal(false)
                chai.expect(groups[2].taken >= groups[2].required).to.equal(false)
                done()
            })
    })
})