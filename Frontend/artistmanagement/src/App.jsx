import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import GigFindVideo from "./assets/imgs/GigFind.mov";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent body scrolling
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.touchAction = "none";

    const timer = setTimeout(() => {
      setIsLoading(false);
      navigate("/client"); // Navigate to client page
    }, 3000); // Video will play for 3 seconds

    return () => {
      clearTimeout(timer);
      // Reset body styles when component unmounts
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
    };
  }, [navigate]);

  return (
    <div
      className="app"
      style={{
        overflow: "hidden",
        position: "fixed",
        width: "100%",
        height: "100%",
        touchAction: "none",
        userSelect: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {isLoading ? (
        <div className="loader">
          <div className="video-container">
            <video autoPlay muted className="loader-video">
              <source src={GigFindVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "#ffffff" }}></div>
      )}
    </div>
  );
}

export default App;
