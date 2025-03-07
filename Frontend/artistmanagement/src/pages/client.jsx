import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import heroImage from "../assets/imgs/hero2.jpg";
import artistCoverPhoto from "../assets/imgs/hero2.jpg";
import "./client.css";
import "../assets/root.css";
import defaultCoverPhoto from "../assets/imgs/hero2.jpg";
import { useNavigate } from "react-router-dom";

const Client = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [artists, setArtists] = useState([]);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [mainStreamArtists, setMainStreamArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Open search when user scrolls more than 100px
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/artists");
        const data = await response.json();
        console.log("Raw artist data from API:", data);
        setArtists(data);
        setMainStreamArtists(
          data.filter((artist) => artist.mainstream === true)
        );

        // Extract unique genres from all artists
        const uniqueGenres = [
          ...new Set(data.flatMap((artist) => artist.genres)),
        ].sort();
        setAvailableGenres(uniqueGenres);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  const handleGenreToggle = () => {
    // Smooth scroll to genres section when clicking "See Less"
    if (showAllGenres) {
      const genresSection = document.querySelector(".genres-section");
      if (genresSection) {
        genresSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    setShowAllGenres(!showAllGenres);
  };

  const displayedGenres = showAllGenres
    ? availableGenres
    : availableGenres.slice(0, 12);

  const handleBookNow = (e, artist) => {
    e.preventDefault();
    console.log("Book Now clicked!");

    if (!artist) {
      console.error("No artist data provided");
      return;
    }

    // Log the entire artist object and its properties
    console.log("Artist data:", artist);
    console.log("Artist object keys:", Object.keys(artist));

    // Try to find any property that might be an ID
    const possibleIdProperties = Object.keys(artist).find(
      (key) =>
        key.toLowerCase().includes("id") || key === "_id" || key === "artistId"
    );

    if (possibleIdProperties) {
      const id = artist[possibleIdProperties];
      console.log("Found ID:", id);
      navigate(`/artists/${id}`);
    } else {
      // If we can't find an ID property, let's see what we're working with
      console.error("Available properties:", Object.keys(artist));
    }
  };

  const handleViewProfile = (e, artist) => {
    e.preventDefault();
    console.log("View Profile clicked!");

    if (!artist) {
      console.error("No artist data provided");
      return;
    }

    // Try to find any property that might be an ID
    const possibleIdProperties = Object.keys(artist).find(
      (key) =>
        key.toLowerCase().includes("id") || key === "_id" || key === "artistId"
    );

    if (possibleIdProperties) {
      const id = artist[possibleIdProperties];
      console.log("Found ID:", id);
      navigate(`/artists/${id}`);
    } else {
      console.error("Available properties:", Object.keys(artist));
    }
  };

  const handleDirectBooking = (e, artist) => {
    e.preventDefault();
    console.log("Direct booking clicked!");

    if (!artist) {
      console.error("No artist data provided");
      return;
    }

    // Try to find any property that might be an ID
    const possibleIdProperties = Object.keys(artist).find(
      (key) =>
        key.toLowerCase().includes("id") || key === "_id" || key === "artistId"
    );

    if (possibleIdProperties) {
      const id = artist[possibleIdProperties];
      console.log("Found ID for booking:", id);
      navigate(`/book-now/${id}`);
    } else {
      console.error("Available properties:", Object.keys(artist));
    }
  };

  const renderArtistCard = (artist, index) => {
    console.log("Rendering artist card:", artist); // Debug log
    console.log("Full artist object:", artist);

    // Function to truncate biography text
    const truncateBio = (text, maxLength = 150) => {
      if (!text) return "";
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + "...";
    };

    return (
      <div
        className={`artist-card ${artist.mainstream ? "premium-card" : ""}`}
        key={index}
      >
        {artist.mainstream && (
          <div className="premium-badge">
            <span>Mainstream</span>
          </div>
        )}
        <img
          src={artist.cover_photo || defaultCoverPhoto}
          alt={`${artist.stage_name} Cover`}
          className="card-cover-photo"
        />
        <div className="card-content">
          <div className="card-header">
            <div className="artist-names">
              <h3>{artist.stage_name}</h3>
              <p className="real-name">{artist.real_name}</p>
            </div>
            <div className="base-price">
              <span>Rs. {Math.round(artist.base_price)}</span>
              <small>Base Price</small>
            </div>
          </div>
          <div className="artist-info">
            <p className="artist-description">
              {truncateBio(artist.biography)}
            </p>
            <div className="genres">
              <h4>Genres</h4>
              <div className="genre-tags">
                {artist.genres.map((genre, idx) => (
                  <span key={idx}>{genre}</span>
                ))}
              </div>
            </div>
            <div className="services">
              <h4>Services</h4>
              <div className="service-tags">
                {artist.services.map((service, idx) => (
                  <span key={idx}>{service}</span>
                ))}
              </div>
            </div>
            <p className="availability">{artist.availability}</p>
          </div>
          <div className="card-footer">
            <button
              onClick={(e) => handleViewProfile(e, artist)}
              className="view-profile"
            >
              View Profile
            </button>
            <button
              onClick={(e) => handleDirectBooking(e, artist)}
              className="book-now"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="client-page">
      <Navbar forceSearchOpen={isScrolled} />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Artist</h1>
          <p>Discover world-class creative professionals From Nepal</p>
        </div>
        <div className="hero-overlay"></div>
        <img
          src={heroImage}
          alt="Artist Management Hero"
          className="hero-image"
        />
      </div>
      <div className="client-content">
        <section className="featured-artists">
          <h2>Featured Artists</h2>
          <div className="artist-cards">
            {artists.map((artist, index) => renderArtistCard(artist, index))}
          </div>
        </section>

        <section className="genres-section">
          <h2>Browse by Genres</h2>
          <div className="genres-grid">
            {displayedGenres.map((genre, index) => (
              <div
                className="genre-card"
                key={`${genre}-${index}`}
                onClick={() => console.log(`Selected genre: ${genre}`)}
              >
                <h3>{genre}</h3>
                <span className="genre-count">
                  {
                    artists.filter((artist) => artist.genres.includes(genre))
                      .length
                  }{" "}
                  Artists
                </span>
              </div>
            ))}
          </div>
          {availableGenres.length > 12 && (
            <div className="see-more-container">
              <button className="see-more-button" onClick={handleGenreToggle}>
                {showAllGenres ? "See Less" : "See More"}
              </button>
            </div>
          )}
        </section>

        <section className="main-stream-section">
          <h2>MainStream Artists</h2>
          <div className="artist-cards">
            {mainStreamArtists.map((artist, index) =>
              renderArtistCard(artist, index)
            )}
          </div>
        </section>

        <section className="browse-all-section">
          <button className="browse-all-button">Browse All Artists</button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Client;
