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
app.use(morgan('dev')) // morgan has a few logging default styles - dev is a nice concise color-coded style

app.use(cors())
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

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


app.post('/validate-target-gpa', (req, res) => {
  const { currentGPA, targetGPA, completedCredits, futureCredits } = req.body

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

  // All inputs are valid
  return res.status(200).json({
    message: 'Target GPA inputs are valid'
  })
})


export default app // ES module export style!