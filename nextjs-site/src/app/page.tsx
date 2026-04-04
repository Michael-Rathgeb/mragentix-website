import Nav from '@/components/nav';
import Hero from '@/components/hero';
import ProofBar from '@/components/proof-bar';
import Services from '@/components/services';
import Process from '@/components/process';
import Stack from '@/components/stack';
import Projects from '@/components/projects';
import OpenSource from '@/components/open-source';
import Results from '@/components/results';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import BackToTop from '@/components/back-to-top';
import ClickSparkWrapper from '@/components/click-spark-wrapper';

export default function Home() {
  return (
    <ClickSparkWrapper>
      <Nav />
      <main>
        <Hero />
        <ProofBar />
        <Services />
        <Process />
        <Stack />
        <Projects />
        <OpenSource />
        <Results />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </ClickSparkWrapper>
  );
}
