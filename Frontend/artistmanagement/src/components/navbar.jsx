import React, { useState, useEffect } from "react";
import "../assets/root.css";
import "./navbar.css";
import { FaBell, FaUser, FaBars, FaSearch } from "react-icons/fa";
import logo from "../assets/imgs/logo.png"; // Add this import

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowSearch(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
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
        <div className="nav-actions">
          <div className="nav-icons">
            <FaBell className="icon" />
            <FaUser className="icon" />
          </div>
        </div>

        <FaBars className="menu-icon" onClick={toggleMobileMenu} />
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={`mobile-nav ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="nav-actions">
            <div className="nav-icons">
              <FaBell className="icon" />
              <FaUser className="icon" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
