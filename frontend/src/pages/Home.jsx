import Hero from "../components/Hero/Hero";
import PlatformStats from "../components/PlatformStats/PlatformStats";
import ProgramExplorer from "../components/ProgramExplorer/ProgramExplorer";
import ResourceShowcase from "../components/ResourceShowcase/ResourceShowcase";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import AcademicDiscovery from "../components/AcademicDiscovery/AcademicDiscovery";
import ContributorCTA from "../components/ContributorCTA/ContributorCTA";
import FinalCTA from "../components/FinalCTA/FinalCTA";
import { useEffect } from "react";

function Home() {
  console.log("Home Component rendered")
  useEffect(()=>{
    console.log("Home mounted")
    return ()=>{
        console.log("Home unmounted")
    }
  })
  return (
    <main>
      <Hero />
      {/* <PlatformStats /> */}
      {/* <ProgramExplorer /> */}
      {/* <ResourceShowcase /> */}
      <HowItWorks />
      <AcademicDiscovery />
      <ContributorCTA />
      <FinalCTA />
    </main>
  );
}

export default Home;
