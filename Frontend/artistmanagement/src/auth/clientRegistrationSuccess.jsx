import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import Logo from "../assets/imgs/logo.png";

const ClientRegistrationSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Create confetti elements
    const partyPopper = document.querySelector(".party-popper");
    if (partyPopper) {
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = `confetti confetti-${
          i % 3 > 0 ? "left" : "right"
        } confetti-shape-${i % 3}`;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        partyPopper.appendChild(confetti);
      }
    }

    // Redirect after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/client-login", {
            state: { message: "Registration successful! Please sign in." },
          });
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="party-popper">
        <div className="popper-cannon left">
          <div className="popper-base">🎉</div>
          <div className="popper-trail"></div>
        </div>
        <div className="popper-cannon right">
          <div className="popper-base">🎉</div>
          <div className="popper-trail"></div>
        </div>
        <div className="popper-cannon top">
          <div className="popper-base">🎉</div>
          <div className="popper-trail"></div>
        </div>
      </div>

      <div className="success-card">
        <div className="logo-container">
          <img src={Logo} alt="Company Logo" className="success-logo" />
        </div>

        <div className="success-icon-large">
          <svg
            className="checkmark-large"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <h1 className="thank-you-text">Thank You!</h1>
        <p className="success-message">
          Your client account has been created successfully.
        </p>
        <p className="redirect-text">
          Redirecting to login page in {countdown} seconds...
        </p>
      </div>

      <div className="floating-balloon" style={{ left: "10%", bottom: "5%" }}>
        🎈
        <div className="balloon-string"></div>
      </div>
      <div
        className="floating-balloon"
        style={{ left: "30%", bottom: "10%", animationDelay: "1s" }}
      >
        🎈
        <div className="balloon-string"></div>
      </div>
      <div
        className="floating-balloon"
        style={{ left: "70%", bottom: "5%", animationDelay: "0.5s" }}
      >
        🎈
        <div className="balloon-string"></div>
      </div>
      <div
        className="floating-balloon"
        style={{ left: "85%", bottom: "10%", animationDelay: "1.5s" }}
      >
        🎈
        <div className="balloon-string"></div>
      </div>
    </div>
  );
};

export default ClientRegistrationSuccess;
