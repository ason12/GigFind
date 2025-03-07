import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import "./Sidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [minimized, setMinimized] = React.useState(() => {
    const savedState = localStorage.getItem("sidebarMinimized");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check for mobile view on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Force minimized state on mobile
      if (mobile && !minimized) {
        setMinimized(true);
        localStorage.setItem("sidebarMinimized", "true");
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial render
    
    return () => window.removeEventListener('resize', handleResize);
  }, [minimized]);

  const toggleSidebar = () => {
    // Only allow toggling if not in mobile view
    if (!isMobile) {
      const newState = !minimized;
      setMinimized(newState);
      localStorage.setItem("sidebarMinimized", JSON.stringify(newState));
    }
  };

  // Handle double click on sidebar to maximize
  const handleSidebarDoubleClick = () => {
    // Only allow maximizing if not in mobile view
    if (!isMobile && minimized) {
      setMinimized(false);
      localStorage.setItem("sidebarMinimized", "false");
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Navigate to the corresponding route
    if (tab === "dashboard") {
      navigate("/dashboard");
    } else if (tab === "artists") {
      navigate("/manager/artists");
    } else {
      // For other tabs that don't have routes yet
      console.log(`Navigating to ${tab} (route not implemented yet)`);
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <div 
      className={`sidebar ${minimized ? "minimized" : ""} ${isMobile ? "mobile" : ""}`}
      onDoubleClick={handleSidebarDoubleClick}
    >
      <div className="sidebar-header">
        <div className="logo-container">
          {minimized ? (
            <div className="small-logo">
              <span>G</span>
            </div>
          ) : (
            <img src={logo} alt="Company Logo" className="sidebar-logo" />
          )}
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-items">
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => handleTabChange("dashboard")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
            <span>Dashboard</span>
          </li>
          <li
            className={activeTab === "artists" ? "active" : ""}
            onClick={() => handleTabChange("artists")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Artists</span>
          </li>
          <li
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => handleTabChange("bookings")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Bookings</span>
          </li>
          <li
            className={activeTab === "messages" ? "active" : ""}
            onClick={() => handleTabChange("messages")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Messages</span>
          </li>
          <li
            className={activeTab === "yourinfo" ? "active" : ""}
            onClick={() => handleTabChange("yourinfo")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Your Info</span>
          </li>
          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => handleTabChange("settings")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span>Settings</span>
          </li>
          <li
            className={activeTab === "help" ? "active" : ""}
            onClick={() => handleTabChange("help")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Help</span>
          </li>
        </ul>
        <div className="sidebar-footer">
          <li className="logout-item" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </li>
        </div>
      </nav>

      {/* Only show toggle button when not minimized and not in mobile view */}
      {!minimized && !isMobile && (
        <div className="toggle-button-container">
          <button
            className="toggle-button"
            onClick={toggleSidebar}
            aria-label="Collapse sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
