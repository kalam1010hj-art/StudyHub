import Navbar from "./components/Navbar/Navbar";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
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
import Profile from "./pages/Profile/Profile";
import PublicProfile from "./pages/PublicProfile/PublicProfile";
import UploadResource from "./pages/Academic/Upload";
import EditProfile from "./pages/EditProfile/EditProfile";
import MyUploads from "./pages/MyUploads/MyUploads";
import Settings from "./pages/Settings/Settings";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
function App(){
  console.log("App component rendered")
  useEffect(()=>{
    console.log("App component mounted")
    return ()=>console.log("App component Unmounted")
  },[])
  return (
    <>
    
    <Navbar/>
    <Routes>
      <Route path="" element={<Home/>}/>
      
      {/* university Routes */}
      <Route path="/universities" element={<Universities />} />
      <Route path="/universities/:universityId" element={<UniversityDetails />} />
      {/* college Routes */}
      <Route path="/colleges"  element = {<College/>} />
      <Route path="/colleges/:collegeId" element={<CollegeDetails />} />
      <Route path="/programs/:programId" element={<ProgramDetails />} />
      <Route path="/branch/:branchId" element={<BranchDetails/>}/> 
      <Route path="/semester/:semesterId" element = {<SemesterDetails/>}/>
     
     {/* Resource routes */}
      <Route path="/resourceHub" element= {<ResourceHub/>}/>
      <Route path="resources/:subjectId" element = {<Resources/>}/>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute/>}>
         <Route path="/upload" element = {<UploadResource/>}/>
      </Route>
      

      {/* Authentication and user Profile Routes */}
       <Route path="/login"  element = {<Login/>}/>
       <Route path="/register" element = {<Register/>}/>

       {/* protected Routes */}
       <Route element={<ProtectedRoute/>}>
           <Route path="/profile" element = {<Profile/>}/>
           <Route path="/editProfile" element = {<EditProfile/>}/>
           <Route path="/my-uploads" element = {<MyUploads/>}/>
           <Route path="/settings" element = {<Settings/>}/>
       </Route>

        <Route path="/publicProfile/:userId" element = {<PublicProfile/>}/>


      {/* Catch-all 404 route for invalid paths */}
        <Route path="*" element={<NotFound />} />

    </Routes>
     <Footer/>
    </>
  )
} export default App;