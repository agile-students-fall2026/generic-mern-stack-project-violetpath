import { expect } from 'chai'
import axios from 'axios'
import app from '../app.js'

let server
let baseURL

// start the app on a free port before the tests run
before(() => {
    server = app.listen(0)
    baseURL = `http://localhost:${server.address().port}`
})

// stop the server after the tests finish
after(() => {
    server.close()
})

describe('Declaration API', () => {
    describe('GET /declaration', () => {
        it('returns the current major and the list of majors', async () => {
            const res = await axios.get(`${baseURL}/declaration`, { validateStatus: () => true })
            expect(res.status).to.equal(200)
            expect(res.data.currentMajor).to.equal('Computer Science')
            expect(res.data.majors).to.be.an('array').that.includes('Mathematics')
        })
    })

    describe('POST /declaration', () => {
        const validDeclaration = {
            major: 'Mathematics',
            date: '2027-01-15',
            reason: 'I enjoy proofs',
            signature: 'Test Student',
        }
        const options = { validateStatus: () => true }

        it('accepts a complete declaration', async () => {
            const res = await axios.post(`${baseURL}/declaration`, validDeclaration, options)
            expect(res.status).to.equal(201)
            expect(res.data.declaration).to.deep.equal(validDeclaration)
        })

        it('rejects a request with missing fields', async () => {
            const res = await axios.post(`${baseURL}/declaration`, { major: 'Mathematics' }, options)
            expect(res.status).to.equal(400)
            expect(res.data.fields).to.include.members(['date', 'reason', 'signature'])
        })

        it('rejects a major that is not in the list', async () => {
            const res = await axios.post(
                `${baseURL}/declaration`,
                { ...validDeclaration, major: 'Astrology' },
                options
            )
            expect(res.status).to.equal(400)
            expect(res.data.error).to.equal('Unknown major')
        })
    })
})