import AboutInfo from "./components/AboutInfo";
import ContactInfo from "./components/ContactInfo";
import HomeCarousel from "./components/HomeCarousel";
import LatestWork from "./components/LatestWork";
import ObjectiveSection from "./components/ObjectiveSection";
import OurClients from "./components/OurClients";
import OurServicesSlider from "./components/OurServicesSlider";
import TeamSlider from "./components/TeamSlider";
import TestimonialSection from "./components/TestimonialSection";

export default function HomePage() {
  return (
    <main className="pageOffset">
      <HomeCarousel />
      <AboutInfo/>
      <OurServicesSlider />
      <LatestWork />
      <TeamSlider />
      <TestimonialSection />
      <OurClients />
      <ContactInfo />
      {/* <ObjectiveSection /> */}
    </main>
  );
}
