import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState([]);
  const [balloons, setBalloons] = useState([]);
  const [showPoppers, setShowPoppers] = useState(false);

  useEffect(() => {
    // Automatically redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    // Generate confetti pieces - reduced count
    const confettiCount = 80; // Reduced from 150
    const newConfetti = [];

    for (let i = 0; i < confettiCount; i++) {
      // Create two main sources - left and right (removed top)
      const sourceType = i % 2; // 0: left, 1: right
      let direction, originX, originY;

      if (sourceType === 0) {
        direction = "left";
        originX = Math.random() * 30; // 0-30% from left
        originY = -10; // Above the screen
      } else {
        direction = "right";
        originX = 70 + Math.random() * 30; // 70-100% from left
        originY = -10; // Above the screen
      }

      // Add some randomness to the fall path
      const horizontalVariance = (Math.random() - 0.5) * 20;

      newConfetti.push({
        id: i,
        left: `${originX + horizontalVariance}%`,
        top: `${originY}%`,
        delay: `${Math.random() * 1.5}s`, // Staggered delays for continuous falling
        size: `${Math.random() * 8 + 4}px`,
        direction: direction,
        rotation: Math.random() * 360,
        // Vary the speed of each piece
        duration: `${3 + Math.random() * 3}s`,
        // Add different shapes
        shape: Math.floor(Math.random() * 3),
      });
    }

    setConfetti(newConfetti);

    // Generate balloons - further reduced count
    const balloonCount = 6; // Reduced from 12
    const newBalloons = [];
    const balloonEmojis = ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈"];
    const balloonColors = ["red", "blue", "green", "yellow", "purple", "pink"];

    for (let i = 0; i < balloonCount; i++) {
      const startX = 10 + Math.random() * 80; // Random horizontal position (10-90%)
      const startY = 130 + Math.random() * 20; // Start well below the screen (130-150%)
      const endY = -20 - Math.random() * 30; // End above the screen
      const size = 25 + Math.random() * 15; // Slightly smaller balloons (25-40px)
      const delay = Math.random() * 1.5; // Random delay up to 1.5s
      const duration = 6 + Math.random() * 4; // Random duration between 6-10s
      const wiggleAmount = 1 + Math.random() * 2; // Random wiggle between 1-3
      const colorIndex = Math.floor(Math.random() * balloonColors.length);

      newBalloons.push({
        id: i,
        emoji: balloonEmojis[i % balloonEmojis.length],
        left: `${startX}%`,
        startY: `${startY}%`,
        endY: `${endY}%`,
        size: `${size}px`,
        delay: `${delay}s`,
        duration: `${duration}s`,
        wiggle: wiggleAmount,
        color: balloonColors[colorIndex],
      });
    }

    setBalloons(newBalloons);

    // Show poppers after a small delay
    setTimeout(() => {
      setShowPoppers(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="party-popper">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className={`confetti confetti-${piece.direction} confetti-shape-${piece.shape}`}
            style={{
              left: piece.left,
              top: piece.top,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              width: piece.size,
              height: piece.size,
              transform: `rotate(${piece.rotation}deg)`,
            }}
          />
        ))}

        {balloons.map((balloon) => (
          <div
            key={`balloon-${balloon.id}`}
            className="floating-balloon"
            style={{
              left: balloon.left,
              bottom: `-50px`, // Start completely off-screen
              fontSize: balloon.size,
              animationDelay: balloon.delay,
              animationDuration: balloon.duration,
              color: balloon.color,
              animationName: `float-up-${Math.floor(balloon.wiggle)}`,
            }}
          >
            {balloon.emoji}
            <div className="balloon-string"></div>
          </div>
        ))}

        {showPoppers && (
          <>
            <div className="popper-cannon left">
              <div className="popper-base">🎉</div>
              <div className="popper-trail"></div>
            </div>
            <div className="popper-cannon right">
              <div className="popper-base">🎊</div>
              <div className="popper-trail"></div>
            </div>
            <div className="popper-left">🎉</div>
            <div className="popper-right">🎊</div>
          </>
        )}
      </div>
      <div className="success-card">
        <div className="success-icon-large">
          <svg viewBox="0 0 52 52" className="checkmark-large">
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
        <h2 className="thank-you-text">Thank you!</h2>
        <p className="success-message">
          Your registration has been successful.
        </p>
        <p className="redirect-text">Redirecting to login page...</p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
