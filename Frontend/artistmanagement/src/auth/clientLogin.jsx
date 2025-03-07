import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import "../assets/root.css";
import Logo from "../assets/imgs/logo.png";

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the location state after displaying the message
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setSuccessMessage("");

    if (validateForm()) {
      setIsLoading(true);
      try {
        // Updated endpoint URL for client login
        const response = await axios.post(
          "http://localhost:5000/api/clients/auth",
          formData
        );

        // Store token and client info in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("client", JSON.stringify(response.data.client));

        // Redirect to the previous page if it exists, otherwise go to client dashboard
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate("/clients");
        }
      } catch (error) {
        console.error("Login error:", error);
        setLoginError(
          error.response?.data?.message ||
            "Invalid email or password. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={Logo} alt="Company Logo" className="logo-image" />
        </div>

        <div className="auth-header">
          <h1>Client Login</h1>
          <p className="auth-subtitle">Sign in to your client account</p>
        </div>

        {successMessage && <div className="auth-success">{successMessage}</div>}
        {loginError && <div className="auth-error">{loginError}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? "error" : ""}
              required
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? "error" : ""}
              required
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <Link to="/client-forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/client-register" className="auth-link">
              Sign Up
            </Link>
          </p>
          <p className="mt-3">
            <Link to="/login" className="auth-link">
              Login as Manager
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
