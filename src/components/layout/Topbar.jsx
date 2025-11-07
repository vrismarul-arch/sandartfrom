import React from "react";
import { Layout } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import logoExpanded from "./svj.png";

const { Header } = Layout;

export default function Topbar({ collapsed, onToggle }) {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 20px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // ✅ Add this
      }}
    >
      <h2 className="dashboard-header" style={{ display: "flex", alignItems: "center", margin: 0 }}>
        <PieChartOutlined style={{ marginRight: 8 }} />
        Leads & Revenue Dashboard
      </h2>

<div className="div">
<h4
  style={{
    fontSize: "1.15rem",
    fontWeight: 600,
    color: "#1f1f1f",
    margin: 0,
    padding: 0,
    letterSpacing: "0.3px",
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
  }}
>
  Client Name
</h4>
        <img src={logoExpanded} alt="Logo" className="top-logo" width="140px" />

</div>
    </Header>
  );
}
