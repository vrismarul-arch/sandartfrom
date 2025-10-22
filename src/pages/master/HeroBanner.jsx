// src/components/HeroBanner/HeroBanner.jsx
import React from "react";
import { Carousel } from "antd";
import "./HeroBanner.css";

import slide1 from "./banner1.png";
import slide2 from "./banner2.png";
import slide3 from "./banner3.png";

const HeroBanner = () => {
  const slides = [
    {
      image: slide1,
      title: "EXPERT AND QUALIFIED STAFF!",
      subtitle: "Our professional workers will take care of it.",
      buttonText: "We Connect",
      path: "tel:+919790984055", // ✅ Updated phone number
    },
    {
      image: slide2,
      title: "ADVANCED SECURITY SOLUTIONS",
      subtitle: "Delivering top-tier protection for your business and home.",
      buttonText: "EXPLORE SERVICES",
      path: "#services",
    },
    {
      image: slide3,
      title: "SMART TECHNOLOGY IN ACTION",
      subtitle: "Integrating innovation and reliability for modern safety.",
    },
  ];

  return (
    <section className="heroSection">
      <Carousel
        autoplay
        dotPosition="bottom"
        className="heroCarousel"
        effect="fade"
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="heroSlide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="heroOverlay"></div>

              <div className="heroContainer">
                {/* --- Top Text Section --- */}
                <div className="topContentBox fadeInUp">
                  <h1 className="heroTitle">{slide.title}</h1>
                  <p className="heroDescription">{slide.subtitle}</p>

                  {/* ✅ Show button only if text & path exist */}
                  {slide.buttonText && slide.path && (
                    <a href={slide.path} className="ctaButton topCta">
                      {slide.buttonText}
                    </a>
                  )}
                </div>
              </div>

              {/* --- Bottom Footer Bar --- */}
              <div className="bottomFooterBar">
                <p className="footerText">
                  Looking for a quality and affordable service?
                </p>
                <a
                  href="https://n8n-en7m.onrender.com/form/809256a5-0f50-47e8-930c-6ebe6ce2981e"
                  className="ctaButton bottomCta"
                >
                  GET AN ONLINE QUOTE
                </a>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroBanner;
