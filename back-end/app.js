// import and instantiate express
import express from 'express' // ES module import style
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import fs from 'fs'

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

// function that returns accounts data with email and password
const loadAccounts = () => {
  const data = fs.readFileSync(path.join(__dirname, 'mock-data', 'accounts.json'), 'utf8')
  return JSON.parse(data)
}

// Login API
app.post('/login', (req, res) => {
  let email = req.body.email
  let password = req.body.password

  if (!email || !password) {
    res.status(400).json({
      error: 'Missing email or password'
    })
    return
  }

  const account = loadAccounts().find(account => account.email === email)
  if (!account || account.password !== password) {
    res.status(401).json({ error: 'Invalid email or password' })
    return
  }

  res.status(200).json({
    message: 'Login Successful'
  })
})

const loadMajors = () => {
  const data = fs.readFileSync(path.join(__dirname, 'mock-data', 'majors.json'), 'utf8')
  return JSON.parse(data)
}

// Sign Up API
app.post('/signup', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  let major = req.body.major

  if (!email || !password || !major) {
    res.status(400).json({
      error: 'All fields are required'
    })
    return
  }

  const emails = loadAccounts().map(account => account.email)
  if (emails.includes(email)) {
    res.status(409).json({ error: 'An account already exists with this email address' })
    return
  }

  if (!/^[A-Za-z0-9._%+-]+@nyu\.edu$/.test(email)) {
    return res.status(400).json({
        error: 'Your email should be a NYU email address',
    });
  }

  if (password.length < 6) {
    res.status(400).json({
      error: 'Password must be at least 6 characters long.',
    });
    return
  }

  if (!/\d/.test(password)) {
    res.status(400).json({
      error: 'Password must contain at least one number',
    });
    return
  }

  if (!/[A-Z]/.test(password)) {
    res.status(400).json({
      error: 'Password must contain at least one upper case letter',
    });
    return
  }

  if (!/[a-z]/.test(password)) {
    res.status(400).json({
      error: 'Password must contain at least one lower case letter',
    });
    return
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    res.status(400).json({
      error: 'Password must contain at least one special character',
    });
    return
  }

  if (!loadMajors().includes(major)) {
    res.status(400).json({ error: 'Unknown major' })
    return
  }

  res.status(200).json({
    message: 'Signup Successful'
  })
})

// Forgot Password API
app.post('/forgot-password', (req, res) => {
  let email = req.body.email
  let newPassword = req.body.newPassword

  if (!email || !newPassword) {
    res.status(400).json({
      error: 'Missing email or password'
    })
    return
  }

  const emails = loadAccounts().map(account => account.email)

  if (!emails.includes(email)) {
    res.status(404).json({
      error: 'Email not found'
    })
    return
  }

  if (newPassword.length < 6) {
    res.status(400).json({
      error: 'Password must be at least 6 characters long.',
    });
    return
  }

  if (!/\d/.test(newPassword)) {
    res.status(400).json({
      error: 'Password must contain at least one number',
    });
    return
  }

  if (!/[A-Z]/.test(newPassword)) {
    res.status(400).json({
      error: 'Password must contain at least one upper case letter',
    });
    return
  }

  if (!/[a-z]/.test(newPassword)) {
    res.status(400).json({
      error: 'Password must contain at least one lower case letter',
    });
    return
  }

  if (!/[^A-Za-z0-9]/.test(newPassword)) {
    res.status(400).json({
      error: 'Password must contain at least one special character',
    });
    return
  }

  res.status(200).json({
    message: 'Password Reset Successful'
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

const loadFaqs = () => {
  const data = fs.readFileSync (
    path.join(__dirname,'mock-data', 'faqs.json'),'utf8'
  );
  return JSON.parse(data);
}

//implement search API
app.get('/api/faqs', (req,res)=> {
  const faqs = loadFaqs();
  res.status(200).json(faqs);
});

// load the declaration mock data from its JSON file
const declarationOptions = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'mock-data', 'declaration.json'), 'utf8')
)
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

 // Degree Progress GPA Backend
const loadGPA = () => {
  const data = fs.readFileSync(
    new URL('./mock-data/gpa.json', import.meta.url),
    'utf8'
  )

  return JSON.parse(data)
}
app.get('/degree-progress/gpa', (req, res) => {
  const gpa = loadGPA()[0]
  const creditsTaken = gpa.creditsTaken
  res.status(200).json({
    cumulativeGPA: gpa.cumulativeGPA,
    majorGPA: gpa.majorGPA,
    minorGPA: gpa.minorGPA,
    creditsTaken: creditsTaken,
    creditsLeft: 128 - creditsTaken
  })
})

// load the graduation check mock data from its JSON file
const graduationCheckData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'mock-data', 'graduation-check.json'), 'utf8')
)

// send the graduation check data to the front end
app.get('/degree/graduation', (req, res) => {
  res.status(200).json(graduationCheckData)
})

const studentFile = path.join(__dirname, 'mock-data', 'student.json')

app.get('/student-information', (req, res) => {
  try {
    const data = fs.readFileSync(studentFile, 'utf8')
    const student = JSON.parse(data)

    res.status(200).json(student)
  } catch {
    res.status(500).json({
      error: 'Could not load student information'
    })
  }
})

app.put('/student-information', (req, res) => {
  const data = req.body || {}

  const fields = [
    'firstName',
    'middleName',
    'lastName',
    'studentId',
    'universityId',
    'major',
    'minor',
    'expectedGraduation'
  ]

  for (const field of fields) {
    if (typeof data[field] !== 'string' || !data[field].trim()) {
      return res.status(400).json({
        error: 'Invalid student information'
      })
    }
  }

  const student = {}
  for (const field of fields) {
    student[field] = data[field].trim()
  }

  try {
    fs.writeFileSync(studentFile, JSON.stringify(student, null, 2) + '\n')

    res.status(200).json({
      message: 'Student information saved',
      student: student
    })
  } catch {
    res.status(500).json({
      error: 'Could not save student information'
    })
  }
})

// load the degree requirements mock data from its JSON file
const requirementsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'mock-data', 'requirements.json'), 'utf8')
)

// send the degree requirements to the front end
app.get('/degree/requirements', (req, res) => {
    res.status(200).json(requirementsData)
})

// load the degree progress course mock data from its JSON file
const degreeProgressCourses = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'mock-data', 'degree-progress-courses.json'), 'utf8')
)

// send the current semester courses to the front end
app.get('/degree/progress/courses', (req, res) => {
    res.status(200).json(degreeProgressCourses)
})
export default app // ES module export style!
