import Hero from "../components/Hero";
import SplitSection from "../components/SplitSection";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import About from "../components/About";
import BookingCTA from "../components/BookingCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <SplitSection />
      <Services />
      <Gallery />
      <About />
      <BookingCTA />
    </main>
  );
}
