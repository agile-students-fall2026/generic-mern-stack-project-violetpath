import { Link } from 'react-router-dom';
import './Home.css';

const navItems = [
  { label: 'Course Entry', to: '/courses/add' },
  { label: 'Degree Progress', to: '/degree/progress' },
  { label: 'Degree Requirements', to: '/degree/requirements' },
  { label: 'Graduation Check', to: '/degree/graduation' },
  { label: 'GPA Overview', to: '/gpa/overview' },
  { label: 'Target GPA', to: '/gpa/target' },
  { label: 'Declaration', to: '/declaration' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Department Contacts', to: '/department/contact' },
];

function Home() {
  const student = {
    name: 'Student Name',
    major: 'Computer Science',
    creditsTaken: 48,
    creditsLeft: 16,
    gpa: 3.81,
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <span className="home-logo">LOGO</span>
      </header>

      <section className="home-intro">
        <h1>Home</h1>
        <p className="home-subtitle">
          Welcome back, {student.name}. Major: {student.major}
        </p>
      </section>

      <div className="home-card">
        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat-value">{student.gpa.toFixed(2)}</span>
            <span className="home-stat-label">Cumulative GPA</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-value">{student.creditsTaken}</span>
            <span className="home-stat-label">Credits taken</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-value">{student.creditsLeft}</span>
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