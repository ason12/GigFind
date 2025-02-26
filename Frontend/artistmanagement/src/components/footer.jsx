import React from "react";
import "./footer.css";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            We connect talented artists with opportunities, making the booking
            process seamless and professional for both artists and clients. Join
            our platform to discover and book amazing artists for your events.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(".featured-artists");
                }}
              >
                Featured Artists
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(".genres-section");
                }}
              >
                Genres
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(".main-stream-section");
                }}
              >
                Mainstream Artists
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(".browse-all-section");
                }}
              >
                Browse All Artists
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Become a Manager</h3>
          <p>
            Want to manage talented artists? Join our platform as a manager and
            help artists reach their full potential while building your career
            in artist management.
          </p>
          <button className="become-manager-btn">Become a Manager</button>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              Kathmandu, Nepal
            </li>
            <li>
              <a href="tel:+9779815076935">
                <i className="fas fa-phone"></i>
                +977 9815076935
              </a>
            </li>
            <li>
              <a href="mailto:ason.gautam12@gmail.com">
                <i className="fas fa-envelope"></i>
                ason.gautam12@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-links">
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <div className="copyright">
          <p>&copy; 2025 GigFind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
