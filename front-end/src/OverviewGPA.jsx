import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './OverviewGPA.css';

const API_URL = 'http://localhost:3000';

function OverviewGPA() {
  const [gpaData, setGpaData] = useState(null);
<<<<<<< HEAD
  const [loadError, setLoadError] = useState('');

  // Get GPA data from the backend
  useEffect(() => {
    fetch(`${API_URL}/degree-progress/gpa`)
      .then((response) => response.json())
      .then((data) => setGpaData(data))
      .catch(() => setLoadError('Could not load GPA data.'));
  }, []);

=======
  const [error, setError] = useState('');

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

  const showGPA = value => {
    return typeof value === 'number' ? value.toFixed(3) : '—';
  };

>>>>>>> origin/master
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
<<<<<<< HEAD
              <strong>{gpaData ? gpaData.cumulativeGPA : '—'}</strong>
=======
              <strong>{showGPA(gpaData?.cumulativeGPA)}</strong>
>>>>>>> origin/master
              <span>/ 4.000</span>
            </div>
          </div>

          <div className="overview-gpa-stats">
            <div className="overview-gpa-stat">
              <p>Major GPA</p>
<<<<<<< HEAD
              <strong>{gpaData ? gpaData.majorGPA : '—'}</strong>
=======
              <strong>{showGPA(gpaData?.majorGPA)}</strong>
>>>>>>> origin/master
            </div>

            <div className="overview-gpa-stat">
              <p>Minor GPA</p>
<<<<<<< HEAD
              <strong>{gpaData ? gpaData.minorGPA : '—'}</strong>
=======
              <strong>{showGPA(gpaData?.minorGPA)}</strong>
>>>>>>> origin/master
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
<<<<<<< HEAD
              <strong>{gpaData ? gpaData.creditsTaken : '—'}</strong>
=======
              <strong>{gpaData?.creditsTaken ?? '—'}</strong>
>>>>>>> origin/master
            </div>
            <div className="overview-gpa-stat">
              <p>Credits Left</p>
<<<<<<< HEAD
              <strong>{gpaData ? gpaData.creditsLeft : '—'}</strong>
=======
              <strong>{gpaData?.creditsLeft ?? '—'}</strong>
>>>>>>> origin/master
            </div>
          </div>

          {loadError && <p>{loadError}</p>}
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
