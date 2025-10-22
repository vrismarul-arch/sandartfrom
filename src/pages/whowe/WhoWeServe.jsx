import React from "react";
import "./WhoWeServe.css";
// Import all 12 individual logo files from your assets folder
import logoGanga from "../master/client/indianoil.png";
import logoIndane from "../master/client/hindhu.png";
import logoMahindra from "../master/client/lynk.png";
import logoAJK from "../master/client/iplanet.png";
import logoShanthi from "../master/client/stockhold.png";
import logoNative from "../master/client/kavery.png";
import logoEloraGems from "../master/client/iit.png";
import logoSTS from "../master/client/hindhu.png";


const logos = [
  // Top Row
  logoGanga,
  logoIndane,
  logoMahindra,
  logoAJK,
  logoShanthi,
  logoNative,
  logoEloraGems,
  logoSTS,
  
]; // All 12 logos are now in the array

const WhoWeServe = () => {
  return (
    <section className="who-we-serve-section">
      <div className="container">
        <h2 className="section-title">
          Trusted by Chennai’s top apartments, builders, and corporates.

        </h2>
        

        <div className="logo-grid">
          {logos.map((logo, index) => (
            <div className="logo-item" key={index}>
              {/* Note: The alt text now clearly identifies the logo position */}
              <img src={logo} alt={`Client Logo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;