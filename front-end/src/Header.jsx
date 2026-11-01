
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <h1>VioletPath</h1>

      <nav className="site-navigation">
        <Link to="/">Home</Link>
        <Link to="/gpa/target">GPA Calculator</Link>
        <Link to="/degree/progress">Degree Progress</Link>
        <Link to="/courses/add">Courses</Link>
      </nav>
    </header>
  )
}

export default Header
