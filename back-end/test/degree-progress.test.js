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
        it('returns in-progress courses', async () => {
            const res = await axios.get(
                `${baseURL}/degree/progress/courses`,
                { validateStatus: () => true }
            )

            expect(res.status).to.equal(200)
            expect(res.data.courses).to.be.an('array')

            for (const course of res.data.courses) {
                expect(course).to.have.property('code')
                expect(course).to.have.property('title')
                expect(course.credits).to.be.a('number')
                expect(course.status).to.equal('in-progress')
            }
        })

        it('should not return duplicate courses', async () => {
            const res = await axios.get(
                `${baseURL}/degree/progress/courses`,
                { validateStatus: () => true }
            )

            expect(res.status).to.equal(200)

            const codes = []

            for (const course of res.data.courses) {
                expect(codes).to.not.include(course.code)
                codes.push(course.code)
            }
        })
    })
})