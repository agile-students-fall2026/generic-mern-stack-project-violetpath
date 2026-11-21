import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './StudentInformation.css'
const API_URL = 'http://localhost:3000'

function StudentInformation() {
  const [student, setStudent] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
      fetch(`${API_URL}/student-information`)
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Could not load student information.')
              }
              return response.json()
          })
          .then((data) => setStudent(data))
          .catch((err) => setError(err.message))
  }, [])
  const fields = [
    { label: 'First Name', key: 'firstName' },
    { label: 'Middle Name', key: 'middleName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Student ID', key: 'studentId' },
    { label: 'University ID', key: 'universityId' },
    { label: 'Major', key: 'major' },
    { label: 'Minor', key: 'minor' },
    { label: 'Expected Graduation', key: 'expectedGraduation' }
  ]

  return (
    <main className="student-info">
      <h1>Student Information</h1>

      <div className="student-info-form">
        {error && <p>{error}</p>}
        {!student && !error && <p>Loading...</p>}

        {student && fields.map(item => (
          <div className="student-info-field" key={item.key}>
            <span className="student-info-label">{item.label}</span>
            <span className="student-info-value">
              {student[item.key]}
            </span>
          </div>
        ))}
      </div>

      <Link to="/" className="student-info-home">
        Home
      </Link>
    </main>
  )
}

export default StudentInformation
