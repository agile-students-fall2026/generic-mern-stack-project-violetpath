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

export default app // ES module export style!