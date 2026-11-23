import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';

const navItems = [
  { label: 'Student Information', to: 'student-information' },
  { label: 'Courses', to: '/courses' },
  { label: 'Degree Progress', to: '/degree/progress' },
  { label: 'GPA', to: '/gpa/overview' },
  { label: 'Declaration', to: '/declaration' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Department Contacts', to: '/department/contact' },
];

function Home() {
  const [studentData, setStudentData] = useState(null);
  const [gpaData, setGpaData] = useState(null);
  const [error, setError] = useState('');

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

  return (
    <div className="home-page">
      <div className="home-intro">
        <h1>Home</h1>
        <p className="home-subtitle">
          Welcome back,{' '}
          {studentData
            ? `${studentData.firstName} ${studentData.lastName}`
            : '—'}
          . Major: {studentData?.major ?? '—'}
        </p>
        {error && <p>{error}</p>}
      </div>

      <div className="home-card">
        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat-value">
              {showGPA(gpaData?.cumulativeGPA)}
            </span>
            <span className="home-stat-label">Cumulative GPA</span>
          </div>

          <div className="home-stat">
            <span className="home-stat-value">
              {gpaData?.creditsTaken ?? '—'}
            </span>
            <span className="home-stat-label">Credits taken</span>
          </div>

          <div className="home-stat">
            <span className="home-stat-value">
              {gpaData?.creditsLeft ?? '—'}
            </span>
            <span className="home-stat-label">Credits left</span>
          </div>
        </div>
      </div>

      <div className="home-card">
        <h2>Menu</h2>
        <nav className="home-nav">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="home-nav-button">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Home;