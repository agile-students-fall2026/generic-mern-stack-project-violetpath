import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import LogIn from './LogIn'
import SignUp from './SignUp'
import ForgotPW from './ForgotPW'
import TargetGPA from './TargetGPA'
import OverviewGPA from './OverviewGPA'
import CourseEntryForm from './CourseEntryForm'
import MajorMinorSection from './MajorMinorSection';
import Header from "./Header";
import DegreeProgress from './DegreeProgress'
import HomeScreen from './HomeScreen';
import FAQ from "./FAQ";
import DepartmentContact from "./DepartmentContact"
import StudentInformation from './StudentInformation'
import CoursesSearch from './CoursesSearch'
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
        <Route path="/student-information" element={<StudentInformation />} />
        <Route path="/courses" element={<CoursesSearch />} />
        <Route path="/degree/progress" element={<DegreeProgress />} />
        <Route path="/degree/requirements" element={<MajorMinorSection />} />
        <Route path="/graduation-check" element={<div />} />
        <Route path="/homescreen" element={<HomeScreen />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/department/contact" element={<DepartmentContact />} />
      </Routes>
    </Router>
  )
}

export default App
