import React from 'react';
import { Link } from 'react-router-dom';
import './OurServices.css';
import turnstile from "./product/turnstile.png";
import metalDetector from "./product/metaldetector.png";
import boomBarrier from "./product/boombarrier.png";
import swingbarrier from "../home/Swing Barrier/swing.png";
import flapbarrier from "../home/Flap Barrier/flap3.png";
import BaggageScanner from "./product/scandetect.png";
import homeautoamtion from "../home/Home Automation/home4.png";

// --- Data structure for services ---
const servicesData = [
  {
    title: "Turnstile Gates",
    description: "Ensure controlled and efficient pedestrian entry with durable turnstile gates ideal for offices, metros, and secure facilities.",
    image: turnstile,
    path: "/turnstile"
  },
  {
    title: "Metal Detectors",
    description: "Detect concealed weapons or metallic items with high-accuracy walk-through and handheld metal detectors for enhanced safety.",
    image: metalDetector,
    path: "/metaldetector"
  },
  {
    title: "Boom Barriers",
    description: "Automate vehicle access control with intelligent boom barriers built for parking lots, tolls, and high-security checkpoints.",
    image: boomBarrier,
    path: "/boombarrier"
  },
    {
    title: "Swing Barrier",
    description: "Automate vehicle access control with intelligent boom barriers built for parking lots, tolls, and high-security checkpoints.",
    image: swingbarrier,
    path: "/swingbarrier"
  },
   {
    title: "Flap Barrier",
    description: "Single Core Flap Barrier Gate with Bi-Directional Access.",
    image: flapbarrier,
    path: "/flapbarrier"
    },
    {
    title: "Baggage Scanner",
    description: "Single Core Flap Barrier Gate with Bi-Directional Access.",
    image: BaggageScanner,
    path: "/baggagescanner"
    }
  // 	{
  // 	 title: "Home Automation",
  // 	 description: "A bollard system is a safety solution using sturdy posts to control vehicle access and protect people and property.",
  // 	 image: homeautoamtion,
  // 	 path: "/homeautomation"
  // 	},
];

const OurServices = () => {
  return (
    <div className="security-section" id = "services">        <h2 className="aboutUsTitle section-title">Our Products</h2>

      <div className="content-container">
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <Link to={service.path} key={index} className="service-card-link">
              <div className="service-card">
                
                {/* Background Image Area */}
                <div
                  className="image-area"
                  style={{
                    backgroundImage: service.image ? `url(${service.image})` : 'none',
                    backgroundSize: 'contain', // Kept 'contain' as per your original code
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '150px',
                  }}
                >
                  {!service.image && (
                    <p className="image-placeholder-text">[Image Placeholder]</p>
                  )}
                </div>

                {/* Text Content */}
                <div className="text-content-area">
                   {/* ADDED: The red accent bar container */}
                   <div className="service-red-bar"></div>

                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;