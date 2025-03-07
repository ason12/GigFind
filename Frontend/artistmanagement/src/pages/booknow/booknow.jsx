import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./booknow.css";
import "../../assets/root.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import defaultCoverPhoto from "../../assets/imgs/hero2.jpg";
import esewaLogo from "../../assets/imgs/esewa.png";
import khaltiLogo from "../../assets/imgs/khalti-logo.png";

const BookNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artists/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtist(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artist details:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchArtistDetails();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking details:", bookingDetails);
    console.log("Payment method:", paymentMethod);
  };

  // Add this function to check if form is valid
  const isFormValid = () => {
    return (
      bookingDetails.name.trim() !== "" &&
      bookingDetails.phone.trim() !== "" &&
      bookingDetails.date.trim() !== "" &&
      paymentMethod !== ""
    );
  };

  const handleViewProfile = (e) => {
    e.preventDefault();

    if (!artist) {
      console.error("No artist data available");
      return;
    }

    console.log("Artist data:", artist);

    // Try multiple ways to find the ID
    let artistId = null;

    if (artist._id) {
      artistId = artist._id;
    } else if (artist.id) {
      artistId = artist.id;
    } else {
      // Try to find any property that might be an ID
      const possibleIdProperties = Object.keys(artist).find(
        (key) => key.toLowerCase().includes("id") || key === "_id"
      );

      if (possibleIdProperties) {
        artistId = artist[possibleIdProperties];
      }
    }

    if (artistId) {
      console.log("Found artist ID:", artistId);
      navigate(`/artists/${artistId}`);
    } else {
      console.error("Cannot navigate: artist ID is missing", artist);
      console.log("Available properties:", Object.keys(artist));
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!artist) {
    return <div className="error">Artist not found</div>;
  }

  return (
    <div className="book-now-page">
      <Navbar />
      <div className="book-now-header">
        <div className="header-content">
          <h1>Book Your Event</h1>
          <p>
            Ready to create unforgettable memories with {artist?.stage_name}?
          </p>
          <div className="booking-steps">
            <div className="step">
              <span className="step-number">1</span>
              <span className="step-text">Fill Details</span>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <span className="step-text">Choose Payment</span>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <span className="step-text">Confirm Booking</span>
            </div>
          </div>
        </div>
      </div>
      <div className="book-now-content">
        <div className="booking-grid">
          {/* Artist Details Column */}
          <div className="artist-details-column">
            <div className="artist-profile-card">
              <img
                src={artist.cover_photo || defaultCoverPhoto}
                alt={`${artist.stage_name} Cover`}
                className="artist-cover"
              />
              <div className="artist-info">
                <div className="name-and-badge">
                  <h1>{artist.stage_name}</h1>
                  {artist.mainstream && (
                    <div className="mainstream-badge">
                      <span>Mainstream Artist</span>
                    </div>
                  )}
                </div>
                <p className="real-name">{artist.real_name}</p>
                <div className="price-info">
                  <span className="price-amount">
                    Rs. {Math.round(artist.base_price)}
                  </span>
                  <span className="price-label">Base Price</span>
                </div>
                <div className="artist-biography">{artist.biography}</div>
                <div className="tags-section">
                  <h3>Genres</h3>
                  <div className="tags-container">
                    {artist.genres.map((genre, index) => (
                      <span key={index} className="tag">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="tags-section">
                  <h3>Services</h3>
                  <div className="tags-container">
                    {artist.services.map((service, index) => (
                      <span key={index} className="tag">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="availability-info">
                  Availability: {artist.availability}
                </div>
                <button
                  onClick={handleViewProfile}
                  className="view-profile-btn"
                >
                  View Full Profile
                </button>
              </div>
            </div>
          </div>

          {/* Booking Form Column */}
          <div className="booking-form-column">
            <div className="manager-details">
              <h2>Manager Details</h2>
              <div className="manager-info">
                <p>
                  <strong>Name:</strong> John Smith
                </p>
                <p>
                  <strong>Email:</strong> john.smith@artistmanager.com
                </p>
                <p>
                  <strong>Phone:</strong> +977 9876543210
                </p>
              </div>
              <div className="manager-actions-container">
                <a
                  href="sms:+9779876543210"
                  className="action-btn message-btn full-width"
                >
                  Message
                </a>
                <div className="manager-actions-row">
                  <a href="tel:+9779876543210" className="action-btn call-btn">
                    Call Now
                  </a>
                  <a
                    href="mailto:john.smith@artistmanager.com"
                    className="action-btn mail-btn"
                  >
                    Mail Now
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              <h2>Book Now</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={bookingDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={bookingDetails.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={bookingDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group date-group">
                <label htmlFor="booking-date">Select Event Date</label>
                <input
                  id="booking-date"
                  type="date"
                  name="date"
                  value={bookingDetails.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Additional Message"
                  value={bookingDetails.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="payment-methods">
                <h3>Select Payment Method</h3>
                <div className="payment-options">
                  <button
                    type="button"
                    className={`payment-btn ${
                      paymentMethod === "esewa" ? "selected" : ""
                    }`}
                    onClick={() => setPaymentMethod("esewa")}
                  >
                    <img src={esewaLogo} alt="eSewa" className="payment-logo" />
                  </button>
                  <button
                    type="button"
                    className={`payment-btn ${
                      paymentMethod === "khalti" ? "selected" : ""
                    }`}
                    onClick={() => setPaymentMethod("khalti")}
                  >
                    <img
                      src={khaltiLogo}
                      alt="Khalti"
                      className="payment-logo"
                    />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={!isFormValid()}
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookNow;
