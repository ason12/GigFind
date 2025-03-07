import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/root.css";
import "./navbar.css";
import {
  FaUser,
  FaBars,
  FaSearch,
  FaUserTie,
  FaUserPlus,
  FaQuestionCircle,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/imgs/logo.png"; // Add this import

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // Add a ref for the user modal
  const userModalRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowSearch(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add a new useEffect for handling clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userModalRef.current &&
        !userModalRef.current.contains(event.target) &&
        !event.target.classList.contains("icon")
      ) {
        setShowUserModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  const handleLoginClick = () => {
    navigate("/login");
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  const handleClientLoginClick = () => {
    navigate("/client-login");
    setShowUserModal(false);
  };

  const handleManagerLoginClick = () => {
    navigate("/login");
    setShowUserModal(false);
  };

  const handleRegisterClick = () => {
    navigate("/register");
    setShowUserModal(false);
  };

  const handleHelpClick = () => {
    navigate("/help");
    setShowUserModal(false);
  };

  const handleContactClick = () => {
    navigate("/contact");
    setShowUserModal(false);
  };

  const toggleUserModal = () => {
    setShowUserModal(!showUserModal);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-logo">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </div>

      <div className={`nav-center ${showSearch ? "show-search" : ""}`}>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="nav-right">
        <div className="nav-actions desktop-actions">
          <button className="login-button" onClick={handleLoginClick}>
            Login as Manager
          </button>
          <div className="nav-icons">
            <FaUser className="icon" onClick={toggleUserModal} />

            {/* Simplified User Modal without header */}
            {showUserModal && (
              <div className="user-modal enhanced-modal" ref={userModalRef}>
                <div className="modal-section">
                  <button onClick={handleClientLoginClick}>
                    <FaUser className="modal-icon" /> Login as Client
                  </button>
                  <button onClick={handleHelpClick}>
                    <FaQuestionCircle className="modal-icon" /> Help Center
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <FaBars className="menu-icon" onClick={toggleMobileMenu} />
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="nav-actions">
            <button className="login-button" onClick={handleLoginClick}>
              Login as Manager
            </button>
            <div className="nav-icons">
              <FaUser className="icon" onClick={toggleUserModal} />

              {/* Simplified User Modal for Mobile without header */}
              {showUserModal && (
                <div
                  className="user-modal mobile-user-modal enhanced-modal"
                  ref={userModalRef}
                >
                  <div className="modal-section">
                    <button onClick={handleClientLoginClick}>
                      <FaUser className="modal-icon" /> Login as Client
                    </button>
                    <button onClick={handleHelpClick}>
                      <FaQuestionCircle className="modal-icon" /> Help Center
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
