import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./HowItWorks.css"; // Import the CSS below

const steps = [
  {
    number: 1,
    title: "Submit Your Requirements",
    description: "Select your desired product and location to start your quote.",
  },
  {
    number: 2,
    title: "Get Instant Quote",
    description: "Receive your personalized quote instantly via email.",
  },
  {
    number: 3,
    title: "Connect & Deliver",
    description: "Our team contacts you for finalization and installation.",
  },
];

const HowItWorks = () => {
  return (
    <section className="quote-steps-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="section-title"
      >
        Get Your Quote in 3 Easy Steps
      </motion.h2>

      <div className="steps-container">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="step-item"
            >
              <div className="step-number-circle">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </motion.div>

            {/* Separator */}
            {index < steps.length - 1 && (
              <div className="step-separator">
                <ArrowRight />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
    