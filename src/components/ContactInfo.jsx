import React from "react";
import { PhoneOutlined, ClockCircleOutlined } from "@ant-design/icons";
import "./ContactInfo.css";

const contactData = {
  phones: ["+91 9025994291", "+91 9790984055"],
};

function ContactInfo() {
  return (
    <div className="top-bar-wrapper">
      <div className="top-bar-content">
        <div className="top-bar-left"></div>

        <div className="top-bar-right">
          {/* Phone Numbers */}
          <div className="contact-item phone">
            <PhoneOutlined className="icon phone-icon" />
            <div className="phone-list">
              {contactData.phones.map((num, index) => (
                <a
                  key={index}
                  href={`tel:${num.replace(/\s/g, "")}`}
                  className="phone-number"
                >
                  {num}
                  {index < contactData.phones.length - 1 && (
                    <span className="phone-separator"> / </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Operating Hours */}
         
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
