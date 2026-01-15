import AboutIntro from "./components/AboutIntro";
import ContactInfo from "./components/ContactInfo";
import HomeCarousel from "./components/HomeCarousel";
import LatestWork from "./components/LatestWork";
import OurBrands from "./components/OurBrands";
import OurClients from "./components/OurClients";
import OurServicesSlider from "./components/OurServicesSlider";
import ServiceObjective from "./components/ServiceObjective";
import TeamSlider from "./components/TeamSlider";
import TestimonialSection from "./components/TestimonialSection";


export default function HomePage() {
  return (
    <main className="pageOffset">
      <HomeCarousel />
      <AboutIntro/>
      <ServiceObjective/>
      <OurServicesSlider />
      <LatestWork />
      <OurBrands />
      <TeamSlider />
      <TestimonialSection />
      <OurClients />
      <ContactInfo />
      {/* <ObjectiveSection /> */}
    </main>
  );
}
