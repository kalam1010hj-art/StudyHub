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
      <Route path="/universities" element={<Universities />} />
      <Route path="/universities/:universityId" element={<UniversityDetails />} />
      <Route path="/colleges/:collegeId" element={<CollegeDetails />} />
      <Route path="/programs/:programId" element={<ProgramDetails />} />
      <Route path="/branch/:branchId" element={<BranchDetails/>}/> 
      <Route path="/semester/:semesterId" element = {<SemesterDetails/>}/>
      <Route path="resources/:subjectId" element = {<Resources/>}/>
    </Routes>
     <Footer/>
    </>
  )
} export default App;