import { Link } from 'react-router-dom';
import './MajorMinorSection.css';

const navItems = [
  { label: 'Student Information', to: '/student' },
  { label: 'Courses', to: '/courses' },
  { label: 'Degree Progress', to: '/degree/requirements' },
  { label: 'GPA', to: '/gpa' },
  { label: 'Target GPA', to: '/gpa/target' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Declaration', to: '/declaration' },
  { label: 'Department Contacts', to: '/contacts' },
];

function HomeScreen() {
  const student = {
    name: 'Student Name',
    major: 'Computer Science',
    creditsTaken: 48,
    creditsLeft: 16,
    gpa: 3.81,
  };

  return (
    <div className="major-minor">
      <header className="app-header">
        <span className="logo">LOGO</span>
      </header>

      <section className="section">
        <h2>Home</h2>
        <p className="muted">
          Welcome back, {student.name}. Major: {student.major}
        </p>

        <div className="card">
          <div className="summary-row">
            <span>Cumulative GPA: {student.gpa.toFixed(2)}</span>
            <span>Credits taken: {student.creditsTaken}</span>
            <span>Credits left: {student.creditsLeft}</span>
          </div>
        </div>

        <div className="card">
          <h3>Menu</h3>
          <nav className="home-nav">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="nav-button">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;