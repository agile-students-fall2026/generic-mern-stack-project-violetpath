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
const faqs = [
  {
    question: "How do I check my graduation progress?",
    answer: "Go to Graduation Check to see your completed and remaining credits.",

  },
  {
    question: "How do I calculate my GPA?",
    answer:"Use the GPA Calculator to calculate your current or target GPA.",
  },
  {
    question: "How do I view my degree requirements?",
    answer: "Go to Degree Requirements to see required courses.",
  },
  {
    question: "Who can I contact for help?",
    answer: "Visit Department Contact for more information.",
  },
]
//implement search API
app.get('/api/faqs', (req,res)=> {
  res.json(faqs);
});
app.post('/search-faq', (req,res) => {
  const {search} = req.body;

  if (typeof search !== 'string') {
    return res.status(400).json({
      error: 'Unavailable to search'
    });
  }
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );
  return res.status(200).json({
    results: filteredFaqs
  });
});

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
// mock data for the graduation check page, hard-coded for now
const graduationCheckData = {
  term: 'Spring 2027',
  major: 'Computer Science',
  minor: 'Math',
  totalCredits: { taken: 100, required: 128 },
  groups: [
    { key: 'major', label: 'Major credits', taken: 40, required: 48 },
    { key: 'minor', label: 'Minor credits', taken: 12, required: 16 },
    { key: 'core', label: 'Core credits', taken: 20, required: 24 },
  ],
}

// send the graduation check data to the front end
app.get('/degree/graduation', (req, res) => {
  res.status(200).json(graduationCheckData)
})

export default app // ES module export style!