import { Link } from 'react-router-dom';
import './DegreeRequirements.css';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000';

function StatusBadge({ status }) {
  const labels = {
    completed: 'Completed',
    'in-progress': 'In progress',
    'not-started': 'Not started',
  };

  return (
    <span className={`degree-req-status degree-req-status-${status}`}>
      {labels[status] || status}
    </span>
  );
}

function CourseRow({ course }) {
  return (
    <li className="degree-req-course-row">
      <div className="degree-req-course-info">
        <strong className="degree-req-course-code">
          {course.code}
        </strong>
        <p className="degree-req-course-title">
          {course.title}
        </p>
      </div>

      <div className="degree-req-course-details">
        <span className="degree-req-course-credits">
          {course.credits} credits
        </span>
        <StatusBadge status={course.status} />
      </div>
    </li>
  );
}

function RequirementGroup({ group, showTitle = true }) {
  return (
    <div className="degree-req-group">
      {showTitle && <h4>{group.name}</h4>}

      <ul className="degree-req-course-list">
        {group.courses.map((course) => (
          <CourseRow key={course.id} course={course} />
        ))}
      </ul>
    </div>
  );
}

function MajorSection({ major }) {
  const electiveGroups = major.groups.filter((group) =>
    group.name.toLowerCase().includes('elective')
  );

  const requiredGroups = major.groups.filter((group) =>
    !group.name.toLowerCase().includes('elective')
  );

  return (
    <section className="degree-req-card">
      <h2>Major Requirements</h2>

      <p className="degree-req-subtitle">
        Major: {major.name}
      </p>

      <div className="degree-req-summary">
        <div className="degree-req-summary-item">
          <p>Credits Taken</p>
          <strong>{major.creditsTaken}</strong>
        </div>

        <div className="degree-req-summary-item">
          <p>Credits Left</p>
          <strong>{major.creditsLeft}</strong>
        </div>
      </div>

      <div className="degree-req-course-section">
        <h3>{major.name} Courses</h3>

        {requiredGroups.length > 0 ? (
          <div className="degree-req-groups">
            {requiredGroups.map((group) => (
              <RequirementGroup
                key={group.name}
                group={group}
                showTitle={
                  group.name.toLowerCase() !==
                  `${major.name.toLowerCase()} courses`
                }
              />
            ))}
          </div>
        ) : (
          <p className="degree-req-empty">
            No required courses available.
          </p>
        )}
      </div>

      <div className="degree-req-course-section">
        <h3>Elective Courses</h3>

        {electiveGroups.length > 0 ? (
          <div className="degree-req-groups">
            {electiveGroups.map((group) => (
              <RequirementGroup
                key={group.name}
                group={group}
                showTitle={
                  group.name.toLowerCase() !== 'elective courses' &&
                  group.name.toLowerCase() !== 'electives courses'
                }
              />
            ))}
          </div>
        ) : (
          <p className="degree-req-empty">
            No elective courses available.
          </p>
        )}
      </div>
    </section>
  );
}


function MinorCard({ minor }) {
  return (
    <div className="degree-req-group">
      <h4>{minor.name} Minor</h4>

      <ul className="degree-req-course-list">
        {minor.courses.map((course) => (
          <CourseRow key={course.id} course={course} />
        ))}
      </ul>

      <div className="degree-req-minor-summary">
        <div className="degree-req-minor-stat">
          <p>Credits Left</p>
          <strong>{minor.creditsLeft}</strong>
        </div>

        <div className="degree-req-minor-stat">
          <p>Credits Taken</p>
          <strong>{minor.creditsTaken}</strong>
        </div>

        <div className="degree-req-minor-stat">
          <p>GPA</p>
          <strong>
            {typeof minor.gpa === 'number'
              ? minor.gpa.toFixed(3)
              : '—'}
          </strong>
        </div>
      </div>
    </div>
  );
}

function MinorSection({ minors, minorDetails }) {
  return (
    <section className="degree-req-card">
      <h2>Minor Requirements</h2>

      <div className="degree-req-minor-list">
        <h3>List of Minors</h3>

        <ul>
          {minors.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>

      <div className="degree-req-course-section">
        <h3>Minor Course Requirements</h3>

        <div className="degree-req-groups">
          {minorDetails.map((minor) => (
            <MinorCard key={minor.name} minor={minor} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DegreeRequirements() {
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/degree/requirements`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load degree requirements');
        }
        return response.json();
      })
      .then((result) => setData(result))
      .catch(() => setLoadError('Could not load degree requirements.'));
  }, []);

  return (
    <div className="degree-req-page">
      <div className="degree-req-container">
        <h1>Degree Requirements</h1>

        {loadError && <p className="degree-req-empty">{loadError}</p>}

        {data && (
          <>
            <MajorSection major={data.major} />
            <MinorSection
              minors={data.minors}
              minorDetails={data.minorDetails}
            />
          </>
        )}

        <Link to="/" className="degree-req-home">
          Home
        </Link>
      </div>
    </div>
  );
}

export default DegreeRequirements;