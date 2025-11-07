// Sidebar.jsx
import React from "react";
import { Layout, Menu, Button } from "antd"; // Import Button for a more standard button feel, though a Menu item works too
import { HomeOutlined, BarChartOutlined, TeamOutlined, LogoutOutlined } from "@ant-design/icons"; // Import LogoutOutlined
import { useLocation, useNavigate } from "react-router-dom";
import logoCollapsed from "../../assets/vrismsmall.png";
import logoExpanded from "../../assets/vrism.png";

const { Sider } = Layout;

export default function Sidebar({ collapsed, onCollapse }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Map paths to menu keys
  const pathToKey = {
    "/admin/dashboard": "1",
    "/admin/leads": "2", // Corrected path/key mapping for clarity, though it wasn't used
  };

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/admin/dashboard");
   
     
      // Key '4' for Logout is handled separately below or can be added here
      default:
        break;
    }
  };

  const handleLogout = () => {
    // ⚠️ IMPORTANT: Implement your actual logout logic here.
    // This typically includes:
    // 1. Clearing authentication tokens/session from local storage or context.
    // 2. Navigating the user to the login page.
    console.log("Logout clicked. Implementing actual logic...");
    navigate("/login"); 
  };

  // Determine the selected key based on the current path, default to '1' if path not found
  const selectedKey = pathToKey[location.pathname] || "1";

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme="light"
      width={220}
      style={{
        height: "100vh", // Full viewport height
        position: "sticky", // Sticky to the side
        top: 0,
        backgroundColor: "#ffffff",
        // Removed `overflow: "auto"` from Sider to place the logout button at the bottom correctly
        display: 'flex', // Use flexbox for layout
        flexDirection: 'column', // Stack children vertically
      }}
    >
      {/* Logo */}
      <div
        className="logo"
        style={{
          height: 64,
          textAlign: "center",
          padding: "16px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0, // Prevent logo from shrinking
        }}
      >
        <img
          src={collapsed ? logoCollapsed : logoExpanded}
          alt="Logo"
          style={{ height: 32 }}
        />
        {!collapsed && (
          <span
            style={{
              color: "#0E2C44", // Dark blue text
              fontWeight: "bold",
              marginLeft: 8,
              fontSize: 18,
            }}
          >
             {/* You can add a title here if you want */}
          </span>
        )}
      </div>

      {/* Menu - Takes up remaining vertical space */}
      <Menu
        theme="light"
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={handleMenuClick}
        items={[
          { key: "1", icon: <HomeOutlined style={{ color: "#0E2C44" }} />, label: "Dashboard" },
          // Changed path/key to reflect "Analytics" label accurately
    
        ]}
        style={{
          backgroundColor: "#ffffff",
          color: "#0E2C44",
          flexGrow: 1, // Allows menu to take up all available vertical space
          borderRight: 'none', // Remove default menu border
          overflowY: 'auto', // Add scroll to the menu if items exceed height
        }}
      />
      
      {/* Logout Button */}
      {/* The Ant Design Menu can contain items that are styled like buttons or a separate component can be used */}
      <div 
        className="sidebar-footer"
        style={{
          padding: '16px',
          borderTop: '1px solid #f0f0f0', // Separator line
          flexShrink: 0, // Prevent footer from shrinking
        }}
      >
        {/* We use a Menu.Item here for consistent styling and behavior with Ant Design Menu */}
         <Menu
            theme="light"
            mode="inline"
            selectable={false} // Logout shouldn't be selected
            style={{ backgroundColor: "#ffffff", borderRight: 'none' }}
            items={[
                { 
                    key: "logout", 
                    icon: <LogoutOutlined style={{ color: "#0E2C44" }} />, 
                    label: "Logout",
                    onClick: handleLogout,
                    style: {
                      color: "#0E2C44", // Dark text color
                    }
                }
            ]}
          />
      </div>
    </Sider>
  );
}