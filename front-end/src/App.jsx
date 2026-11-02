import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import LogIn from './LogIn'
import TargetGPA from './TargetGPA'
import CourseEntryForm from './CourseEntryForm'
import MajorMinorSection from './MajorMinorSection';
import FAQ from "./FAQ";
import DepartmentContact from "./DepartmentContact"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/gpa/target" element={<TargetGPA />} />
        <Route path="/courses/add" element={<CourseEntryForm />} />
        <Route path="/degree/requirements" element={<MajorMinorSection />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/department/contact" element={<DepartmentContact />} />
      </Routes>
    </Router>
  )
}

export default App