import React from "react";
import {
  IoShieldOutline,
  IoPhonePortraitOutline,
  IoVideocamOutline,
  IoMicOutline,
  IoSettingsOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import "./AboutUsSection.css";
import smartLockImage from "./cctv.png"; // Replace with actual image path

const featuresData = [
  {
    icon: IoShieldOutline,
    title: "Complete Security Protection",
    description:
      "We deliver comprehensive security systems designed to safeguard homes, offices, and industries. Our advanced surveillance and access solutions ensure 24/7 protection and peace of mind.",
  },
  {
    icon: IoPhonePortraitOutline,
    title: "Smart App Control",
    description:
      "Monitor, manage, and control your security devices directly from your smartphone. Our integrated app lets you stay connected and in control—anytime, anywhere.",
  },
  {
    icon: IoVideocamOutline,
    title: "High-Definition Surveillance",
    description:
      "Experience crystal-clear video monitoring with our HD and IP-based camera solutions. Every detail is captured with precision for maximum security coverage.",
  },
  {
    icon: IoMicOutline,
    title: "Two-Way Audio Systems",
    description:
      "Our cameras are equipped with built-in microphones and speakers, allowing live communication and real-time audio alerts through your mobile or control system.",
  },
  {
    icon: IoSettingsOutline,
    title: "Professional Installation & Support",
    description:
      "Our skilled technicians provide end-to-end installation, maintenance, and remote technical assistance to keep your systems running flawlessly.",
  },
  {
    icon: IoDocumentTextOutline,
    title: "Certified & Trusted Solutions",
    description:
      "We are an authorized provider of industry-standard security solutions, offering certified products and services trusted by residential, commercial, and government clients.",
  },
];

const AboutUsSection = () => {
  return (
    <section className="aboutUsSection">
      <div className="aboutUsContainer">
        <div className="aboutHeader">
          <h2 className="aboutUsTitle section-title">ABOUT US</h2>
          
        </div>

        <div className="featuresGrid">
          {featuresData.map((feature, index) => (
            <div key={index} className="featureCard">
              <div className="iconCircle">
                <feature.icon className="featureIcon" />
              </div>
              <div className="featureText">
                <h3 className="featureTitle">{feature.title}</h3>
                <p className="featureDescription">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default AboutUsSection;
