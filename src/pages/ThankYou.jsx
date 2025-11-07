import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

export default function ThankYou() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(10); // Set countdown to 10

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const timer = setTimeout(() => navigate("/"), 10000); // Redirect after 10s

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="thankyou-wrapper">
      <div className="thankyou-card">

        <div className="success-icon">
          <span className="checkmark">&#10003;</span>
        </div>

        <h1 className="title">Quotation Sent Successfully!</h1>

        <p className="message">
          We’ve received your request and sent the quotation to your email.
          <br />Our team will review and get back to you shortly.
        </p>

        <p className="highlight">📩 Thank you for choosing us!</p>

        <p className="countdown">
          Redirecting in <b>{counter}</b> seconds...
        </p>
      </div>
    </div>
  );
}
