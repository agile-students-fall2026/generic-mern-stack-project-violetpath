import './MajorMinorSection.css';
import { major, minors, minorDetails } from './mockRequirements';

function StatusBadge({ status }) {
  const labels = {
    completed: 'Completed',
    'in-progress': 'In progress',
    'not-started': 'Not started',
  };
  return <span className={`status status-${status}`}>{labels[status]}</span>;
}

function CourseRow({ course }) {
  return (
    <li className="course-row">
      <span className="course-check">
        {course.status === 'completed' ? '✔' : ''}
      </span>
      <span className="course-code">{course.code}</span>
      <span className="course-title">{course.title}</span>
      <span className="course-credits">{course.credits} cr</span>
      <StatusBadge status={course.status} />
    </li>
  );
}

function RequirementGroup({ group }) {
  return (
    <div className="card">
      <h3>{group.name}</h3>
      <ul className="course-list">
        {group.courses.map((course) => (
          <CourseRow key={course.id} course={course} />
        ))}
      </ul>
    </div>
  );
}

function MajorSection({ major }) {
  return (
    <section className="section">
      <h2>Major Requirements</h2>
      <p className="muted">Major: {major.name}</p>
      <div className="summary-row">
        <span>Major credits taken: {major.creditsTaken}</span>
        <span>Major credits left: {major.creditsLeft}</span>
      </div>
      {major.groups.map((group) => (
        <RequirementGroup key={group.name} group={group} />
      ))}
    </section>
  );
}

function MinorCard({ minor }) {
  const coursesDone = minor.courses.filter(
    (course) => course.status === 'completed'
  ).length;
  const coursesLeft = minor.coursesRequired - coursesDone;

  return (
    <div className="card">
      <h3>{minor.name} Minor</h3>
      <ul className="course-list">
        {minor.courses.map((course) => (
          <CourseRow key={course.id} course={course} />
        ))}
      </ul>
      <div className="summary-row">
        <span>Courses left: {coursesLeft} / {minor.coursesRequired}</span>
        <span>Credits taken: {minor.creditsTaken}</span>
        <span>GPA: {minor.gpa.toFixed(2)}</span>
      </div>
    </div>
  );
}

function MinorSection() {
  return (
    <section className="section">
      <h2>Minor Requirements</h2>
      <div className="card">
        <h3>List of Minors</h3>
        <ul className="minor-list">
          {minors.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      {minorDetails.map((minor) => (
        <MinorCard key={minor.name} minor={minor} />
      ))}
    </section>
  );
}

function MajorMinorSection() {
  return (
    <div className="major-minor">
      <MajorSection major={major} />
      <MinorSection />
    </div>
  );
}

export default MajorMinorSection;