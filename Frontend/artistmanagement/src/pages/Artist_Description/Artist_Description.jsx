import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import defaultCoverPhoto from "../../assets/imgs/hero2.jpg";
import "./Artist_Description.css";

const ArtistDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        console.log("Fetching artist with ID:", id);
        const response = await fetch(`http://localhost:5000/api/artists/${id}`);
        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched artist data:", data);
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

  const handleBookNow = () => {
    navigate(`/book-now/${id}`);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
        }}
      >
        Loading artist details...
      </div>
    );
  }

  if (!artist) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
        }}
      >
        Artist not found. ID: {id}
      </div>
    );
  }

  return (
    <div className="artist-description-page">
      <Navbar />

      <div className="artist-hero-section">
        <img
          src={artist.cover_photo || defaultCoverPhoto}
          alt={`${artist.stage_name} Cover`}
          className="artist-hero-image"
        />
        <div className="artist-hero-overlay"></div>
        {artist.mainstream && (
          <div className="mainstream-badge">
            <span>Mainstream Artist</span>
          </div>
        )}
      </div>

      <div className="artist-details-container">
        <div className="artist-profile-card">
          <div className="artist-header">
            <div className="artist-info">
              <div className="name-and-badge">
                <h1 className="artist-name">{artist.stage_name}</h1>
                {artist.mainstream && (
                  <div className="mainstream-badge">
                    <span>Mainstream Artist</span>
                  </div>
                )}
              </div>
              <p className="artist-real-name">{artist.real_name}</p>
            </div>
            <div className="artist-price-info">
              <div className="price-amount">
                Rs. {Math.round(artist.base_price)}
              </div>
              <div className="price-label">Base Price</div>
            </div>
          </div>

          <div className="artist-biography">{artist.biography}</div>

          <div className="artist-section">
            <h2 className="section-title">Genres</h2>
            <div className="tags-container">
              {artist.genres.map((genre, index) => (
                <span key={index} className="tag">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="artist-section">
            <h2 className="section-title">Services</h2>
            <div className="tags-container">
              {artist.services.map((service, index) => (
                <span key={index} className="tag">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="booking-section">
            <div className="availability">
              Availability: {artist.availability}
            </div>
            <button className="book-artist-button" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArtistDescription;
