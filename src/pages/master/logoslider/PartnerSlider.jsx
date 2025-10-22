import React, { useEffect } from "react";
import "./PartnerSlider.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Local logo imports
import logo1 from "./corprateparty/came.png";
import logo2 from "./corprateparty/essl.png";
import logo3 from "./corprateparty/hikvision.png";
import logo4 from "./corprateparty/honeywell.png";
import logo5 from "./corprateparty/zkteco.png";


const PartnerSlider = () => {
  const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="partner-slider ">
      <div className="featured-header">
        <h2 className="background-textvedio section-title">Our Trusted Brands</h2>
        <h3 className="foreground-text">“We Partner with Global Security Leaders”</h3>
      </div>
      {/* First row - left to right */}
      <div className="slider row1" data-aos="fade-up">
        <div className="slide-track">
          {logos.concat(logos).map((logo, i) => (
            <div className="slide" key={`row1-${i}`}>
              <img src={logo} alt={`Partner ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default PartnerSlider;
