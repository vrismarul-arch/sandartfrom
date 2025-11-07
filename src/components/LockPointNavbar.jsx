import React, { useState } from "react";
import "./LockPointNavbar.css";
import { PhoneOutlined } from "@ant-design/icons";

const LockPointNavbar = () => {
  return (
    <>
      <header className="main-navbar">
        <div className="container">

          {/* Logo */}
          <img src="logo.png" alt="Logo" className="logo-img" />

          {/* Right Section (Phones) */}
          <div className="top-bar-right">
            <a href="tel:+919025994291" className="contact-item phone">
              <PhoneOutlined className="icon phone-icon" />
              <span className="phone-number">+91 9025994291</span>
            </a>

            <span className="phone-separator">|</span>

            <a href="tel:+919790984055" className="contact-item phone">
              <span className="phone-number">+91 9790984055</span>
            </a>
          </div>

        </div>
      </header>
    </>
  );
};

export default LockPointNavbar;
