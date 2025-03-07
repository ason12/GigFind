import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import nepalFlag from "../assets/imgs/Flag_of_Nepal.png";
import Logo from "../assets/imgs/logo.png";

const ClientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Log the form data to see what's being submitted
    console.log("Form data before submission:", formData);

    // Basic validation
    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      // Prepare data for API - format for client registration
      const clientData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: `+977${formData.phoneNumber}`,
      };

      console.log("Sending client registration data:", clientData);

      // Make API call to register client
      const response = await axios.post(
        "http://localhost:5000/api/clients",
        clientData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Client registration successful:", response.data);

      // Redirect to login page with success message
      navigate("/client-login", {
        state: {
          message:
            "Registration successful! Please login with your credentials.",
        },
      });
    } catch (err) {
      setLoading(false);
      console.error("Registration error details:", err);

      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);

        // More specific error handling
        if (err.response.data?.errors) {
          // If server returns specific validation errors
          const serverErrors = err.response.data.errors;
          console.log("Server validation errors:", serverErrors);
          setError(Object.values(serverErrors).join(", "));
        } else {
          setError(
            err.response.data?.message || "Server error: " + err.response.status
          );
        }
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("No response from server. Please check your connection.");
      } else {
        console.error("Error message:", err.message);
        setError("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={Logo} alt="Company Logo" className="logo-image" />
        </div>

        <div className="auth-header">
          <h1>Create Client Account</h1>
          <p className="auth-subtitle">Join our platform as a client</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className="phone-input-container">
              <div className="country-code">
                <img src={nepalFlag} alt="Nepal Flag" className="nepal-flag" />
                <span>+977</span>
              </div>

              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="98XXXXXXXX"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/client-login" className="auth-link">
              Sign In
            </Link>
          </p>
          <p className="mt-3">
            <Link to="/register" className="auth-link">
              Register as Manager
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientRegister;
