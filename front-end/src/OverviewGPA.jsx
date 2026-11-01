
import { Link } from 'react-router-dom'
import './OverviewGPA.css'

function OverviewGPA() {
  return (
    <main className="overview-gpa-page">
      <div className="overview-gpa-container">
        <header className="overview-gpa-header">
          <h1>LOGO</h1>
        </header>

        <h2>GPA</h2>

        <section className="overview-gpa-summary">
          <p>Current Major: Computer Science</p>
          <p>Current Minor: Math</p>
          <p>Cumulative GPA: 3.781</p>
          <p>Major GPA: 3.812</p>
          <p>Minor GPA: 3.811</p>
          <p># of credits taken: XX credits</p>
          <p># of credits left: XX credits</p>
        </section>

        <section className="overview-gpa-courses">
          <h3>List of the courses with letter grades</h3>

          <h4>Spring 2026</h4>

          <div className="overview-gpa-category">
            <h4>Major Courses</h4>
            <p>Course Name - Grade</p>
          </div>

          <div className="overview-gpa-category">
            <h4>Major Electives</h4>
            <p>Course Name - Grade</p>
          </div>

          <div className="overview-gpa-category">
            <h4>General Electives</h4>
            <p>Course Name - Grade</p>
          </div>

          <div className="overview-gpa-category">
            <h4>CORE Curriculum</h4>
            <p>Course Name - Grade</p>
          </div>
        </section>

        <div className="overview-gpa-buttons">
          <Link className="overview-gpa-button" to="/">
            Home
          </Link>

          <Link className="overview-gpa-button" to="/gpa/target">
            GPA Calculator
          </Link>
        </div>
      </div>
    </main>
  )
}

export default OverviewGPA