import Hero from "../components/Hero/Hero";
import PlatformStats from "../components/PlatformStats/PlatformStats";
import ProgramExplorer from "../components/ProgramExplorer/ProgramExplorer";
import ResourceShowcase from "../components/ResourceShowcase/ResourceShowcase";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import AcademicDiscovery from "../components/AcademicDiscovery/AcademicDiscovery";
import ContributorCTA from "../components/ContributorCTA/ContributorCTA";
import FinalCTA from "../components/FinalCTA/FinalCTA";

function Home() {
  return (
    <main>
      <Hero />
      <PlatformStats />
      <ProgramExplorer />
      <ResourceShowcase />
      <HowItWorks />
      <AcademicDiscovery />
      <ContributorCTA />
      <FinalCTA />
    </main>
  );
}

export default Home;
