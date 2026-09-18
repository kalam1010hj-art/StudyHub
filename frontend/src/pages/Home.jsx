import { useEffect } from "react";
import Hero from "../components/Hero/Hero";
import PlatformStats from "../components/PlatformStats/PlatformStats";
import ProgramExplorer from "../components/ProgramExplorer/ProgramExplorer";
import ResourceShowcase from "../components/ResourceShowcase/ResourceShowcase";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import AcademicDiscovery from "../components/AcademicDiscovery/AcademicDiscovery";
import ContributorCTA from "../components/ContributorCTA/ContributorCTA";
import FinalCTA from "../components/FinalCTA/FinalCTA";
import Footer from "../components/Footer/Footer";
function Home(){
    console.log("Home component rendered")
    useEffect(()=>{
        console.log("home mounted")
        return ()=> console.log("home unmounted")
    },[])
    return (
        <div>
       <Hero/>
       <PlatformStats/>
       <ProgramExplorer/>
       <ResourceShowcase/>
       <HowItWorks/>
       <AcademicDiscovery/>
       <ContributorCTA/>
       <FinalCTA/>
      
       </div>
    )
} export default Home;