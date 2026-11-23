
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './OverviewGPA.css';

function OverviewGPA() {
  const [gpaData, setGpaData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');

  // Get GPA data from the backend
  useEffect(() => {
    fetch('http://localhost:3000/degree-progress/gpa')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load GPA');
        }
        return response.json();
      })
      .then(data => setGpaData(data))
      .catch(() => setError('Could not load GPA data.'));
  }, []);

  // Get student information from the backend
  useEffect(() => {
    fetch('http://localhost:3000/student-information')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load student information');
        }
        return response.json();
      })
      .then(data => setStudentData(data))
      .catch(() => setError('Could not load student information.'));
  }, []);

  const showGPA = value => {
    return typeof value === 'number' ? value.toFixed(3) : '—';
  };

  return (
    <div className="overview-gpa-page">
      <div className="overview-gpa-container">
        <h2>GPA Overview</h2>

        {error && <p>{error}</p>}

        <section className="overview-gpa-summary">
          <div className="overview-gpa-section-heading">
            <h3>Academic Summary</h3>
            <span>Spring 2026</span>
          </div>

          <div className="overview-gpa-highlight">
            <p>Cumulative GPA</p>
            <div className="overview-gpa-main-value">
              <strong>{showGPA(gpaData?.cumulativeGPA)}</strong>
              <span>/ 4.000</span>
            </div>
          </div>

          <div className="overview-gpa-stats">
            <div className="overview-gpa-stat">
              <p>Major GPA</p>
              <strong>{showGPA(gpaData?.majorGPA)}</strong>
            </div>

            <div className="overview-gpa-stat">
              <p>Minor GPA</p>
              <strong>{showGPA(gpaData?.minorGPA)}</strong>
            </div>
          </div>

          <div className="overview-gpa-program">
            <div className="overview-gpa-program-row">
              <span>Major</span>
              <strong>{studentData?.major ?? '—'}</strong>
            </div>
            <div className="overview-gpa-program-row">
              <span>Minor</span>
              <strong>{studentData?.minor ?? '—'}</strong>
            </div>
          </div>

          <div className="overview-gpa-stats">
            <div className="overview-gpa-stat">
              <p>Credits Taken</p>
              <strong>{gpaData?.creditsTaken ?? '—'}</strong>
            </div>
            <div className="overview-gpa-stat">
              <p>Credits Left</p>
              <strong>{gpaData?.creditsLeft ?? '—'}</strong>
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

          <Link to="/gpa/target" className="overview-gpa-button">
            GPA Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OverviewGPA;