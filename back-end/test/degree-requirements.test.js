import { expect } from 'chai'
import axios from 'axios'
import app from '../app.js'
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