
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './StudentInformation.css'

function StudentInformation() {
  const [student, setStudent] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    studentId: '',
    universityId: '',
    major: '',
    minor: '',
    graduation: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setStudent({ ...student, [name]: value })
  }

  return (
    <main className="student-info">
      <div className="student-info-logo">
        <span>VioletPath</span>
      </div>

      <h1>Student Information</h1>

      <div className="student-info-form">
        <input name="firstName" placeholder="First Name"
          value={student.firstName} onChange={handleChange} />

        <input name="middleName" placeholder="Middle Name"
          value={student.middleName} onChange={handleChange} />

        <input name="lastName" placeholder="Last Name"
          value={student.lastName} onChange={handleChange} />

        <input name="studentId" placeholder="Student ID"
          value={student.studentId} onChange={handleChange} />

        <input name="universityId" placeholder="University ID"
          value={student.universityId} onChange={handleChange} />

        <input name="major" placeholder="Major"
          value={student.major} onChange={handleChange} />

        <input name="minor" placeholder="Minor"
          value={student.minor} onChange={handleChange} />

        <input name="graduation" placeholder="Year | Expected Graduation"
          value={student.graduation} onChange={handleChange} />
      </div>

      <Link to="/" className="student-info-home">Home</Link>
    </main>
  )
}

export default StudentInformation
