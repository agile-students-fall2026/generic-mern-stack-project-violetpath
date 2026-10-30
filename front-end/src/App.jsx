import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import LogIn from './LogIn'
import TargetGPA from './TargetGPA'
import MajorMinorSection from './MajorMinorSection';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/gpa/target" element={<TargetGPA />} />
        <Route path="/degree/requirements" element={<MajorMinorSection />} />
      </Routes>
    </Router>
  )
}

export default App