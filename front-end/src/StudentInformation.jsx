import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './StudentInformation.css'
const API_URL = 'http://localhost:3000'

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

function StudentInformation() {
  const [student, setStudent] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setStudent((prev) => ({ ...prev, [name]: value }))
    setMessage('')
  }

  const handleSave = () => {
    setError('')
    setMessage('')

    fetch(`${API_URL}/student-information`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not save student information.')
        }
        return response.json()
      })
      .then((data) => {
        setStudent(data.student)
        setMessage('Saved!')
      })
      .catch((err) => setError(err.message))
  }

  return (
    <main className="student-info">
      <h1>Student Information</h1>

      <div className="student-info-form">
        {error && <p>{error}</p>}
        {!student && !error && <p>Loading...</p>}

        {student && fields.map(item => (
          <div className="student-info-field" key={item.key}>
            <label className="student-info-label">{item.label}</label>
            <input name={item.key} placeholder={item.label}
              value={student[item.key] ?? ''} onChange={handleChange} />
          </div>
        ))}

        {student && (
          <button type="button" onClick={handleSave} className="student-info-save">
            Save
          </button>
        )}
        {message && <p className="student-info-message">{message}</p>}
      </div>

      <Link to="/" className="student-info-home">
        Home
      </Link>
    </main>
  )
}

export default StudentInformation
