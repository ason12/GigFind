import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import "./dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarMinimized, setSidebarMinimized] = useState(() => {
    const savedState = localStorage.getItem("sidebarMinimized");
    return savedState ? JSON.parse(savedState) : false;
  });

  // Listen for changes to the sidebar state in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const minimizedState = localStorage.getItem("sidebarMinimized");
      if (minimizedState) {
        setSidebarMinimized(JSON.parse(minimizedState));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        className={`dashboard-content ${
          sidebarMinimized ? "sidebar-minimized" : ""
        }`}
      >
        <div className="managers-dashboard-text">Managers Dashboard</div>
      </div>
    </div>
  );
};

export default Dashboard;
