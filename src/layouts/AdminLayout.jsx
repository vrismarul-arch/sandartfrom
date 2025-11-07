import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function AdminLayout({ onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => { onLogout(); navigate("/admin/login"); };

  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "10px",
    marginBottom: "5px",
    textDecoration: "none",
    color: isActive ? "white" : "#333",
    backgroundColor: isActive ? "#007bff" : "transparent",
    borderRadius: "4px",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{  padding: "20px", backgroundColor: "#f5f5f5", borderRight: "1px solid #ccc" }}>
        <h3>Admin Panel</h3>
        <nav>
          <NavLink to="dashboard" style={linkStyle}>Dashboard</NavLink>
          {/* Add more links here */}
        </nav>
        <button onClick={handleLogout} style={{ marginTop: "20px", padding: "8px 12px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px" }}>
          Logout
        </button>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
