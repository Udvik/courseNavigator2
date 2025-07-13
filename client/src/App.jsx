import { BrowserRouter as Router, Routes, Route , useLocation } from "react-router-dom";
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import SkillPage from './pages/SkillPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddCourse from './pages/AddCourse';
import Profile from "./pages/Profile";
import Navbar from './components/Navbar';
import AddSkill from "./pages/AddSkill";


function App() {
  const location = useLocation();
  const hideNavbarOn = ["/login", "/signup" , "/"];
  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skill/:id" element={<SkillPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-skill" element={<AddSkill />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
export default App;

