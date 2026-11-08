
import { Link } from 'react-router-dom'
import './DegreeProgress.css'

function DegreeProgress() {
  return (
    <main className="degree-progress-page">
      <div className="degree-progress-container">

        <h2>Degree Progress</h2>

        <section className="degree-progress-box">
          <div className="degree-progress-summary">
            <p>Current Semester: Spring 2027</p>
            <p>Current Major: Computer Science</p>
            <p>Current Minor: Mathematics</p>
            <p># of Credits: 100 / 128 Credits</p>
          </div>

          <div className="degree-progress-buttons">
            <Link to="/degree/requirements" className="degree-progress-link">
              Requirements
            </Link>

            <Link to="/graduation-check" className="degree-progress-link">
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
