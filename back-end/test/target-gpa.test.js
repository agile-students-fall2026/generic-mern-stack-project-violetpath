import { expect } from 'chai'
import { request } from 'chai-http'
import app from '../app.js'

describe('POST /calculate-target-gpa', () => {

  it('should calculate the required GPA correctly', async () => {
    const res = await request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 3.5,
        targetGPA: 3.7,
        completedCredits: 60,
        futureCredits: 30
      })

    expect(res).to.have.status(200)
    expect(res.body.requiredGPA).to.equal(4.1)
    expect(res.body.achievable).to.equal(false)
  })

  it('should return true for an achievable target GPA', async () => {
    const res = await request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 3.0,
        targetGPA: 3.5,
        completedCredits: 60,
        futureCredits: 60
      })

    expect(res).to.have.status(200)
    expect(res.body.requiredGPA).to.equal(4)
    expect(res.body.achievable).to.equal(true)
  })

  it('should return 400 when a required field is missing', async () => {
    const res = await request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 3.5,
        targetGPA: 3.7,
        completedCredits: 60
      })

    expect(res).to.have.status(400)
    expect(res.body).to.have.property('error')
  })

  it('should return 400 when GPA is greater than 4', async () => {
    const res = await request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 4.5,
        targetGPA: 3.7,
        completedCredits: 60,
        futureCredits: 30
      })

    expect(res).to.have.status(400)
  })

  it('should return 400 for a non-numeric GPA', async () => {
    const res = await request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 'hello',
        targetGPA: 3.7,
        completedCredits: 60,
        futureCredits: 30
      })

    expect(res).to.have.status(400)
  })

  it('should return 400 when future credits are zero', async () => {
    const res = await request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 3.5,
        targetGPA: 3.7,
        completedCredits: 60,
        futureCredits: 0
      })

    expect(res).to.have.status(400)
  })

  it('should return 400 for negative credits', async () => {
    const res = await request.execute(app)
      .post('/calculate-target-gpa')
      .send({
        currentGPA: 3.5,
        targetGPA: 3.7,
        completedCredits: -10,
        futureCredits: 30
      })

    expect(res).to.have.status(400)
  })

})