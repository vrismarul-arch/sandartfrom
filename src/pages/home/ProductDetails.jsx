import React, { useState } from "react";
import { Image, Typography, Card, Row, Col, Button } from "antd";
import { PhoneOutlined, FileTextOutlined } from "@ant-design/icons";

// Product Images
import product1 from "../home/image/product.png";
import product2 from "../home/image/produt2.png";
import product3 from "../home/image/produt3.png";

// Brand Logos
import esslLogo from "../home/logos/essl.png";
import zktecoLogo from "../home/logos/zkteco.png";
import cameLogo from "../home/logos/came.png";
import hikvisionLogo from "../home/logos/hikvision.png";
import honeywellLogo from "../home/logos/honeywell.png";

import "./ProductDetails.css";

const { Paragraph } = Typography;

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(product1);
  const [selectedBrand, setSelectedBrand] = useState("eSSL");

  const handleCall = () => {
    window.location.href = "tel:+919952150059";
  };

  const handleQuote = () => {
    window.open(
      "https://n8n-en7m.onrender.com/form/809256a5-0f50-47e8-930c-6ebe6ce2981e",
      "_blank"
    );
  };

  // Brand-based info
  const brandData = {
    eSSL: {
      title: "eSSL Boom Barrier (BB-Radar)",
      desc: "Premium vehicle detection and access control solution designed for high-performance security gates.",
    },
    ZKTeco: {
      title: "ZKTeco Boom Barrier",
      desc: "Advanced automatic barriers with radar-based vehicle detection for efficient traffic control.",
    },
    CAME: {
      title: "CAME Boom Barrier",
      desc: "Italian-engineered barriers providing reliability and smooth operation for heavy-duty usage.",
    },
    Hikvision: {
      title: "Hikvision Boom Barrier",
      desc: "AI-powered automatic boom barriers for smart parking and access control environments.",
    },
    Honeywell: {
      title: "Honeywell Boom Barrier",
      desc: "Durable, weather-resistant barriers suitable for industrial and commercial security solutions.",
    },
  };

  const brandLogos = [
    { name: "eSSL", logo: esslLogo },
    { name: "ZKTeco", logo: zktecoLogo },
    { name: "CAME", logo: cameLogo },
    { name: "Hikvision", logo: hikvisionLogo },
    { name: "Honeywell", logo: honeywellLogo },
  ];

  return (
    <div className="product-page">
      {/* --- Title Section --- */}
      <div className="product-title">
        <h1 className="title-heading">{brandData[selectedBrand].title}</h1>
        <p className="title-subtext">{brandData[selectedBrand].desc}</p>
      </div>

      {/* --- Image Gallery --- */}
      <Card bordered={false} className="image-card">
        <div className="gallery-grid">
          <div className="gallery-main">
            <div className="image-wrapper">
              <Image
                src={mainImage}
                alt="Boom Barrier Main"
                className="gallery-main-img"
                style={{ height: "400px" }}
              />
              <div className="badge">
                <span className="number">100%</span>
                <span className="label">GUARANTEE</span>
              </div>
            </div>
          </div>

          <div className="gallery-thumbs">
            {[product1, product2, product3].map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className="gallery-thumb"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* --- Brand Selector --- */}
      <div className="brand-variant-section">
        <h2 className="brand-variant-title">Available Brand Variants</h2>
        <div className="brand-logos">
          {brandLogos.map((brand) => (
            <img
              key={brand.name}
              src={brand.logo}
              alt={brand.name}
              className={`brand-logo ${
                selectedBrand === brand.name ? "active" : ""
              }`}
              onClick={() => setSelectedBrand(brand.name)}
            />
          ))}
        </div>
      </div>

      {/* --- Product Info --- */}
      <div className="product-details">
        <Row gutter={[24, 24]} className="details-row">
          <Col xs={24} md={12} lg={8}>
            <Card title="Product Highlights" bordered={false} className="info-card">
              <ul>
                <li>Fast response radar-based vehicle detection</li>
                <li>Designed for high-traffic and industrial environments</li>
                <li>Anti-collision, manual override, and safety beam support</li>
                <li>Weatherproof and long-life operation</li>
                <li>Ideal for parking lots, toll gates, and access control zones</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Card title="Technical Specifications" bordered={false} className="info-card">
              <ul>
                <li>Power Supply: AC 220V ±10%, 50Hz</li>
                <li>Operating Temperature: -20°C to +60°C</li>
                <li>Material: Stainless Steel / Alloy Housing</li>
                <li>Operation Mode: Automatic / Manual Override</li>
                <li>Control Interface: Remote / RFID / Access Controller</li>
                <li>Motor Type: DC Brushless Motor</li>
                <li>Speed Options: 1s / 3s / 6s models available</li>
              </ul>
            </Card>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Card title="Variants / Model Options" bordered={false} className="info-card">
              <ul>
                <li>{selectedBrand} Standard Model</li>
                <li>{selectedBrand} Pro Series (High-Speed)</li>
                <li>{selectedBrand} Heavy-Duty Model</li>
                <li>Custom configurations available upon request</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>

      {/* --- Sticky Footer Buttons --- */}
      <div className="sticky-footer">
        <Button
          type="primary"
          icon={<PhoneOutlined />}
          className="btn-call"
          onClick={handleCall}
        >
          Call Now
        </Button>
        <Button
          type="default"
          icon={<FileTextOutlined />}
          className="btn-quote"
          onClick={handleQuote}
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
