import { Link } from 'react-router-dom';
import './OverviewGPA.css';

function OverviewGPA() {
  return (
    <div className="overview-gpa-page">
      <div className="overview-gpa-container">
        <h2>GPA Overview</h2>

        <section className="overview-gpa-summary">
          <div className="overview-gpa-section-heading">
            <h3>Academic Summary</h3>
            <span>Spring 2026</span>
          </div>

          <div className="overview-gpa-highlight">
            <p>Cumulative GPA</p>
            <div className="overview-gpa-main-value">
              <strong>3.781</strong>
              <span>/ 4.000</span>
            </div>
          </div>

          <div className="overview-gpa-stats">
            <div className="overview-gpa-stat">
              <p>Major GPA</p>
              <strong>3.812</strong>
            </div>

            <div className="overview-gpa-stat">
              <p>Minor GPA</p>
              <strong>3.811</strong>
            </div>
          </div>

          <div className="overview-gpa-program">
            <div className="overview-gpa-program-row">
              <span>Major</span>
              <strong>Computer Science</strong>
            </div>

            <div className="overview-gpa-program-row">
              <span>Minor</span>
              <strong>Math</strong>
            </div>
          </div>

          <div className="overview-gpa-stats">
            <div className="overview-gpa-stat">
              <p>Credits Taken</p>
              <strong>XX</strong>
            </div>

            <div className="overview-gpa-stat">
              <p>Credits Left</p>
              <strong>XX</strong>
            </div>
          </div>
        </section>
        <section className="overview-gpa-courses">
          <h3>Course Grades</h3>
          <p className="overview-gpa-semester">
            Spring 2026
          </p>

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
          <Link to="/" className="overview-gpa-button">
            Home
          </Link>

          <Link
            to="/gpa/target"
            className="overview-gpa-button"
          >
            GPA Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OverviewGPA;