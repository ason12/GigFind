import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import nepalFlag from "../assets/imgs/Flag_of_Nepal.png";
import Logo from "../assets/imgs/logo.png";

const Register = () => {
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

      // Prepare data for API - format for manager registration
      const managerData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: `+977${formData.phoneNumber}`,
        company_name: "Default Company", // You might want to add this field to your form
      };

      console.log("Sending manager registration data:", managerData);

      // Make API call to register manager with the correct endpoint
      const response = await axios.post(
        "http://localhost:5000/api/managers",
        managerData
      );

      console.log("Manager registration successful:", response.data);

      // Redirect to success page instead of login
      navigate("/registration-success");
    } catch (err) {
      setLoading(false);
      console.error("Registration error details:", err);

      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);

        setError(
          err.response.data?.message || "Server error: " + err.response.status
        );
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
          <h1>Create Account</h1>
          <p>Join our community </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
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
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
