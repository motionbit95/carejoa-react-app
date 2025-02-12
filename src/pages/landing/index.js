import Banner from "./banner";
import CTA from "./cta";
import Feature from "./feature";
import Hero from "./hero";
import Review from "./review";
import Service1 from "./service1";
import Service2 from "./service2";
import LandingHeader from "./header";

const Landing = () => {
  return (
    <div style={{ position: "relative" }}>
      <LandingHeader />
      <Banner />
      <Hero />
      <Review />
      <div>
        <Feature />
        <Service1 />
      </div>
      <Service2 />
      <CTA />
    </div>
  );
};

export default Landing;
