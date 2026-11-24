
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './OverviewGPA.css';

function OverviewGPA() {
  const [gpaData, setGpaData] = useState(null);
  const [requirements, setRequirements] = useState(null);
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

  // Get course grades from the backend
  useEffect(() => {
    fetch('http://localhost:3000/degree/requirements')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load requirements');
        }
        return response.json();
      })
      .then(data => setRequirements(data))
      .catch(() => setError('Could not load course grades.'));
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
              <strong>{gpaData?.major ?? '—'}</strong>
            </div>

            <div className="overview-gpa-program-row">
              <span>Minor</span>
              <strong>
                {gpaData
                  ? gpaData.minors.join(', ') || 'None'
                  : '—'}
              </strong>
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

          {requirements && (
            <>
              {requirements.major.groups.map(group => (
                <div key={group.name} className="overview-gpa-category">
                  <h4>{group.name}</h4>

                  {group.courses
                    .filter(course => course.status === 'completed' && course.grade)
                    .map(course => (
                      <p key={course.id}>
                        {course.title} - {course.grade}
                      </p>
                    ))}
                </div>
              ))}

              {requirements.minorDetails.map(minor => (
                <div key={minor.name} className="overview-gpa-category">
                  <h4>{minor.name} Minor</h4>

                  {minor.courses
                    .filter(course => course.status === 'completed' && course.grade)
                    .map(course => (
                      <p key={course.id}>
                        {course.title} - {course.grade}
                      </p>
                    ))}
                </div>
              ))}

              <div className="overview-gpa-category">
                <h4>General Electives</h4>

                {requirements.generalElectives.courses
                  .filter(course => course.status === 'completed' && course.grade)
                  .map(course => (
                    <p key={course.id}>
                      {course.title} - {course.grade}
                    </p>
                  ))}
              </div>

              <div className="overview-gpa-category">
                <h4>CORE Curriculum</h4>

                {requirements.core.groups.map(group => (
                  <div key={group.name}>
                    {group.courses
                      .filter(course => course.status === 'completed' && course.grade)
                      .map(course => (
                        <p key={course.id}>
                          {course.title} - {course.grade}
                        </p>
                      ))}
                  </div>
                ))}
              </div>
            </>
          )}
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
