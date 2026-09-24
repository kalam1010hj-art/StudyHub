import Navbar from "./components/Navbar/Navbar";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Universities from "./pages/Academic/Universities";
import UniversityDetails from "./pages/Academic/UniversityDetails";
import ProgramDetails from "./pages/Academic/ProgramDetails";
import CollegeDetails from "./pages/Academic/CollegeDetails";
import BranchDetails from "./pages/Academic/BranchDetails";
import SemesterDetails from "./pages/Academic/SemesterDetails";
import Resources from "./pages/Academic/Resources";
import College from "./pages/Academic/College";
import ResourceHub from "./pages/Academic/ResourceHub";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Login from "./components/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Profile from "./pages/Profile/Profile";
import PublicProfile from "./pages/PublicProfile/PublicProfile";
import UploadResource from "./pages/Academic/Upload";
import EditProfile from "./pages/EditProfile/EditProfile";
import MyUploads from "./pages/MyUploads/MyUploads";
import Settings from "./pages/Settings/Settings";
import AcademicManagement from "./pages/AcademicManagement/AcademicManagement";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App(){
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const seo = path === "/"
      ? {
          title: "StudyHub — Academic Resources for Students",
          description: "Discover academic notes, question papers, study materials, and resources organized by university, college, degree, branch, semester, and subject.",
        }
      : path === "/universities"
      ? {
          title: "Universities — StudyHub",
          description: "Explore universities and discover colleges and academic resources available on StudyHub.",
        }
      : path === "/colleges"
      ? {
          title: "Colleges — StudyHub",
          description: "Explore colleges, programs, branches, semesters, and study resources on StudyHub.",
        }
      : path === "/resourceHub"
      ? {
          title: "Resource Hub — StudyHub",
          description: "Find study materials, notes, question papers, and academic resources on StudyHub.",
        }
      : path === "/about"
      ? {
          title: "About StudyHub",
          description: "Learn about StudyHub and its mission to make academic resources easier for students to discover.",
        }
      : path === "/contact"
      ? {
          title: "Contact StudyHub",
          description: "Contact StudyHub for questions, feedback, or requests to add academic institutions.",
        }
      : path === "/privacy"
      ? {
          title: "Privacy Policy — StudyHub",
          description: "Read the StudyHub privacy policy and learn how user information is handled.",
        }
      : path === "/terms"
      ? {
          title: "Terms of Service — StudyHub",
          description: "Read the StudyHub terms of service for using the academic resource platform.",
        }
      : {
          title: "StudyHub — Academic Resources",
          description: "StudyHub is an academic resource platform for students.",
        };

    document.title = seo.title;

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    description.setAttribute("content", seo.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://study-hub-gold-delta.vercel.app${path === "/" ? "/" : path}`;
  }, [location.pathname]);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="" element={<Home/>}/>

        {/* university Routes */}
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:universityId" element={<UniversityDetails />} />

        {/* college Routes */}
        <Route path="/colleges" element={<College/>} />
        <Route path="/colleges/:collegeId" element={<CollegeDetails />} />
        <Route path="/programs/:programId" element={<ProgramDetails />} />
        <Route path="/branch/:branchId" element={<BranchDetails/>}/>
        <Route path="/semester/:semesterId" element={<SemesterDetails/>}/>

        {/* Resource routes */}
        <Route path="/resourceHub" element={<ResourceHub/>}/>
        <Route path="resources/:subjectId" element={<Resources/>}/>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute/>}>
          <Route path="/upload" element={<UploadResource/>}/>
        </Route>

        {/* Authentication and user Profile Routes */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:uid/:token" element={<ResetPassword/>}/>

        {/* protected Routes */}
        <Route element={<ProtectedRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>
          <Route path="/my-uploads" element={<MyUploads/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/academic-management" element={<AcademicManagement/>}/>
        </Route>

        <Route path="/publicProfile/:userId" element={<PublicProfile/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/contact" element={<Contact/>}/>

        {/* Catch-all 404 route for invalid paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  )
}
export default App;