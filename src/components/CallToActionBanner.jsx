import React from 'react';
import './CallToActionBanner.css'; 

const CallToActionBanner = () => {
  return (
    <section className="cta-banner">
      <div className="container cta-content">
        <h2 className="cta-title">Let's Make Something Great Together</h2>
        {/* Link should point to your contact page */}
        <a href="https://n8n-en7m.onrender.com/form/809256a5-0f50-47e8-930c-6ebe6ce2981e" className="cta-button">Send Enquiry</a>
      </div>
    </section>
  );
};

export default CallToActionBanner;