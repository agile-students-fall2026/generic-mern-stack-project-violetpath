
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './DegreeProgress.css'

const API_URL = 'http://localhost:3000'

function DegreeProgress() {
  const [courses, setCourses] = useState([])
  const [gpaData, setGpaData] = useState(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/degree/progress/courses`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load courses')
        }
        return response.json()
      })
      .then((data) => setCourses(data.courses))
      .catch(() => setLoadError('Could not load courses.'))
  }, [])

  useEffect(() => {
    fetch(`${API_URL}/degree-progress/gpa`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load GPA data')
        }
        return response.json()
      })
      .then((data) => setGpaData(data))
      .catch(() => setLoadError('Could not load GPA data.'))
  }, [])

  return (
    <main className="degree-progress-page">
      <div className="degree-progress-container">

        <h2>Degree Progress</h2>

        <section className="degree-progress-box">
          <div className="degree-progress-summary">
            <p>Current Major: {gpaData?.major ?? '—'}</p>

            <p>
              Current Minor: {gpaData
                ? gpaData.minors.join(', ') || 'None'
                : '—'}
            </p>

            <p>
              # of Credits: {gpaData?.creditsTaken ?? '—'}
              {' / '}
              {gpaData?.creditsRequired ?? '—'} Credits
            </p>
          </div>

          <section className="degree-progress-courses">
            <h3>In-Progress Courses</h3>

            {loadError && <p>{loadError}</p>}

            <ul className="degree-progress-course-list">
              {courses.map((course) => (
                <li key={course.id} className="degree-progress-course-row">
                  <strong>{course.code}</strong>
                  <span>{course.title}</span>
                  <span>{course.credits} credits</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="degree-progress-buttons">
            <Link to="/degree/requirements" className="degree-progress-link">
              Requirements
            </Link>

            <Link to="/degree/graduation" className="degree-progress-link">
              Graduation Check
            </Link>
          </div>
        </section>

        <Link to="/" className="degree-progress-home">
          Home
        </Link>
      </div>
    </main>
  )
}

export default DegreeProgress
