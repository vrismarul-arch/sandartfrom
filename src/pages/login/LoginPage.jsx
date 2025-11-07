import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form } from "antd";
import toast from "react-hot-toast";
import logoExpanded from "../../assets/vrism.png";
import "./LoginPage.css";

export default function LoginPage({ onLogin }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await api.post("/api/admin/login", values);
      toast.success(response.data.message);
      localStorage.setItem("adminToken", response.data.token);
      onLogin();
      navigate("/admin/leads");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <img src={logoExpanded} alt="Logo" className="main-logo" />
        <h1>Welcome Back 👋</h1>
        <p>Manage your admin dashboard securely and efficiently.</p>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="login-right">
        <div className="login-box glass-card">
          <h2>Admin Login</h2>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
              <Input placeholder="Enter Email" size="large" />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password placeholder="Enter Password" size="large" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="login-btn"
              loading={loading}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>

    </div>
  );
}
