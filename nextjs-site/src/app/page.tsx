import Nav from '@/components/nav';
import Hero from '@/components/hero';
import ProofBar from '@/components/proof-bar';
import Services from '@/components/services';
import AutomationFlow from '@/components/automation-flow';
import AgentDemo from '@/components/agent-demo';
import Process from '@/components/process';
import Stack from '@/components/stack';
import Projects from '@/components/projects';
import OpenSource from '@/components/open-source';
import Results from '@/components/results';
import RoiCalculator from '@/components/roi-calculator';
import Faq from '@/components/faq';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import BackToTop from '@/components/back-to-top';
import ClickSparkWrapper from '@/components/click-spark-wrapper';
import ScrollProgress from '@/components/ui/scroll-progress';
import SectionDivider from '@/components/ui/section-divider';

export default function Home() {
  return (
    <ClickSparkWrapper>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <ProofBar />
        <Services />
        <AutomationFlow />
        <AgentDemo />
        <Process />
        <Stack />
        <Projects />
        <OpenSource />
        <Results />
        <RoiCalculator />
        <Faq />
        <SectionDivider className="py-8" label="ready when you are" />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </ClickSparkWrapper>
  );
}
