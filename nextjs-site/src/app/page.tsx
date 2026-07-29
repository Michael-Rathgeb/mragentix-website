import Nav from '@/components/nav';
import Hero from '@/components/hero';
import ProofBar from '@/components/proof-bar';
import Services from '@/components/services';
import AutomationFlow from '@/components/automation-flow';
import Process from '@/components/process';
import Stack from '@/components/stack';
import Projects from '@/components/projects';
import OpenSource from '@/components/open-source';
import Results from '@/components/results';
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
        <Process />
        <Stack />
        <Projects />
        <OpenSource />
        <Results />
        <SectionDivider className="py-8" label="ready when you are" />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </ClickSparkWrapper>
  );
}
