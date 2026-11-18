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