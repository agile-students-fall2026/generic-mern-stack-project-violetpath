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

describe('Degree Progress API', () => {
    describe('GET /degree/progress/courses', () => {
        it('returns the current semester courses', async () => {
            const res = await axios.get(`${baseURL}/degree/progress/courses`, { validateStatus: () => true })
            expect(res.status).to.equal(200)
            expect(res.data.courses).to.be.an('array').that.is.not.empty
            expect(res.data.courses[0]).to.have.property('code')
            expect(res.data.courses[0]).to.have.property('status')
        })
    })
})