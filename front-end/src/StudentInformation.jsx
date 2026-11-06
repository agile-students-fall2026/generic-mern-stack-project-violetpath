
import { Link } from 'react-router-dom'
import './StudentInformation.css'

function StudentInformation() {
  const student = [
    { label: 'First Name', value: 'Richie' },
    { label: 'Middle Name', value: 'None' },
    { label: 'Last Name', value: 'Zhang' },
    { label: 'Student ID', value: 'rz2785' },
    { label: 'University ID', value: 'N16626852' },
    { label: 'Major', value: 'Computer Science' },
    { label: 'Minor', value: 'None' },
    { label: 'Expected Graduation', value: 'Spring 2027' }
  ]

  return (
    <main className="student-info">
      <h1>Student Information</h1>

      <div className="student-info-form">
        {student.map((item) => (
          <div className="student-info-field" key={item.label}>
            <span className="student-info-label">{item.label}</span>
            <span className="student-info-value">{item.value}</span>
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

