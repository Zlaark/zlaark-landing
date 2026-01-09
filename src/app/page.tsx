import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Values from './components/Values/Values';
import Process from './components/Process/Process';
import Portfolio from './components/Portfolio/Portfolio';
import Pricing from './components/Pricing/Pricing';
import FAQ from './components/FAQ/FAQ';
import Careers from './components/Careers/Careers';
import Footer from './components/Footer/Footer';
import Clients from './components/Clients/Clients';
import TechStack from './components/TechStack/TechStack';
import Testimonials from './components/Testimonials/Testimonials';
import StickyValues from './components/Values/StickyValues';

export default function Home() {
  return (
    <main>
      <Hero />
      <Clients />
      <StickyValues /> {/* Accordion Animation from original Home */}
      <Services />
      <TechStack />
      <Process />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Careers />
      <Footer />
    </main>
  );
}
