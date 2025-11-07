import React from 'react';
import './CallToActionBanner.css'; 

const CallToActionBanner = () => {
  return (
    <section className="cta-banner">
      <div className="container cta-content">
        <h2 className="cta-title">Let's Make Something Great Together</h2>
        {/* Link should point to your contact page */}
        <a href="https://n8n-en7m.onrender.com/form/db59820a-75b7-4d3c-8f8d-9cd8d7fbd618" className="cta-button">Send Enquiry</a>
      </div>
    </section>
  );
};

export default CallToActionBanner;