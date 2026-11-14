// import and instantiate express
import express from 'express' // ES module import style
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

const app = express() // instantiate an Express object
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// import some useful middleware
import multer from 'multer' // middleware to handle HTTP POST requests with file uploads
import axios from 'axios' // middleware for making requests to APIs
import dotenv from 'dotenv' // load environmental variables from a hidden file named .env
dotenv.config({ silent: true })
import morgan from 'morgan' // middleware for nice logging of incoming HTTP requests

// use the morgan middleware to log all incoming http requests
app.use(morgan('dev'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Login API (Joh)
app.post('/login', (req, res) => {
  let email = req.body.email
  let password = req.body.password

  if (!email || !password) {
    res.status(400).json({
      error: 'Missing email or password'
    })
    return
  }

  res.status(200).json({
    message: 'Login Successful'
  })
})

// Target GPA Validation + Calculation API
app.post('/calculate-target-gpa', (req, res) => {
  let currentGPA = req.body.currentGPA
  let targetGPA = req.body.targetGPA
  let completedCredits = req.body.completedCredits
  let futureCredits = req.body.futureCredits

  // Check for missing inputs
  if (
    currentGPA === undefined ||
    targetGPA === undefined ||
    completedCredits === undefined ||
    futureCredits === undefined
  ) {
    return res.status(400).json({
      error: 'Missing required GPA or credit information'
    })
  }

  // Check that all inputs are valid numbers
  if (
    typeof currentGPA !== 'number' ||
    typeof targetGPA !== 'number' ||
    typeof completedCredits !== 'number' ||
    typeof futureCredits !== 'number' ||
    !Number.isFinite(currentGPA) ||
    !Number.isFinite(targetGPA) ||
    !Number.isFinite(completedCredits) ||
    !Number.isFinite(futureCredits)
  ) {
    return res.status(400).json({
      error: 'All inputs must be valid numbers'
    })
  }

  // Validate GPA range
  if (
    currentGPA < 0 || currentGPA > 4 ||
    targetGPA < 0 || targetGPA > 4
  ) {
    return res.status(400).json({
      error: 'GPA must be between 0 and 4'
    })
  }

  // Validate credit values
  if (completedCredits < 0 || futureCredits <= 0) {
    return res.status(400).json({
      error: 'Completed credits must be non-negative and future credits must be greater than zero'
    })
  }

  // Calculate required GPA
  const totalCredits = completedCredits + futureCredits

  const requiredGPA = (targetGPA * totalCredits -
    currentGPA * completedCredits) / futureCredits

  if (!Number.isFinite(requiredGPA)) {
    return res.status(400).json({
      error: 'Invalid credit values'
    })
  }

  const achievable = requiredGPA <= 4

  return res.status(200).json({
    requiredGPA: Number(Math.max(0, requiredGPA).toFixed(2)),
    achievable: achievable
  })
})

// mock data for the declaration page, hard-coded for now
const declarationOptions = {
  currentMajor: 'Computer Science',
  majors: [
    'Computer Science',
    'Data Science',
    'Mathematics',
    'Physics',
    'Economics',
    'Psychology',
    'Interactive Media',
    'Philosophy',
  ],
}
// returns true if a value is missing or only spaces
const isBlank = (value) => !value || String(value).trim() === ''
// send the current major and the list of majors to the front end
app.get('/declaration', (req, res) => {
  res.status(200).json(declarationOptions)
})
// receive a declaration form and check it
app.post('/declaration', (req, res) => {
  const body = req.body ?? {}
  const { major } = body
  const missing = ['major', 'date', 'reason', 'signature'].filter(
    (field) => isBlank(body[field])
  )
  if (missing.length > 0) {
    res.status(400).json({
      error: 'Missing required fields',
      fields: missing,
    })
    return
  }
  if (!declarationOptions.majors.includes(major)) {
    res.status(400).json({ error: 'Unknown major' })
    return
  }
  // nothing is saved yet, so just confirm what was received
  res.status(201).json({
    message: 'Declaration received',
    declaration: body,
  })
})
export default app // ES module export style!