import Navbar from "./components/Navbar/Navbar";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
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
    </Routes>
     <Footer/>
    </>
  )
} export default App;