import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import LogIn from './LogIn'
import SignUp from './SignUp'
import ForgotPW from './ForgotPW'
import TargetGPA from './TargetGPA'
import OverviewGPA from './OverviewGPA'
import CourseEntryForm from './CourseEntryForm'
import MajorMinorSection from './MajorMinorSection';
import Header from './Header'
import DegreeProgress from './DegreeProgress'
import HomeScreen from './HomeScreen';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPW />} />
        <Route path="/gpa/overview" element={<OverviewGPA />} />
        <Route path="/gpa/target" element={<TargetGPA />} />
        <Route path="/courses/add" element={<CourseEntryForm />} />
        <Route path="/degree/progress" element={<DegreeProgress />} />
        <Route path="/degree/requirements" element={<MajorMinorSection />} />
        <Route path="/graduation-check" element={<div />} />
        <Route path="/homescreen" element={<HomeScreen />} />
      </Routes>
    </Router>
  )
}

export default App