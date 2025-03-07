import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import "../assets/root.css";
import Logo from "../assets/imgs/logo.png";

const Login = () => {
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
        // First try to login as a regular user
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            formData
          );

          // Store token in localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          // Redirect based on user role
          if (response.data.user.role === "artist") {
            navigate("/artist-dashboard");
          } else {
            navigate("/");
          }
          return; // Exit early if user login succeeds
        } catch (userError) {
          // If user login fails, try manager login
          console.log("User login failed, trying manager login");
        }

        // Try to login as a manager
        const managersResponse = await axios.get(
          "http://localhost:5000/api/managers"
        );
        const managers = managersResponse.data;

        const manager = managers.find(
          (m) => m.email === formData.email && m.password === formData.password
        );

        if (manager) {
          // Store manager info in localStorage
          localStorage.setItem("manager", JSON.stringify(manager));
          navigate("/dashboard"); // Changed from "/manager-dashboard" to "/managers"
        } else {
          setLoginError("Invalid email or password. Please try again.");
        }
      } catch (error) {
        console.error("Login error:", error);
        setLoginError("An error occurred. Please try again later.");
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
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
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
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
