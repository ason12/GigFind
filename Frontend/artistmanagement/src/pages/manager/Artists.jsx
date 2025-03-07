import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import defaultCoverPhoto from "../../assets/imgs/hero2.jpg";
import "./Artists.css";

const Artists = () => {
  const [activeTab, setActiveTab] = useState("artists");
  const [sidebarMinimized, setSidebarMinimized] = useState(() => {
    const savedState = localStorage.getItem("sidebarMinimized");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showArtistSelectionModal, setShowArtistSelectionModal] =
    useState(false);
  const [formData, setFormData] = useState({
    stage_name: "",
    real_name: "",
    biography: "",
    base_price: "",
    cover_photo: "",
    genres: [],
    services: [],
    availability: "Available",
    mainstream: false,
  });
  const [genreInput, setGenreInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentArtistId, setCurrentArtistId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [artistToDelete, setArtistToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchArtists();

    // Listen for changes to the sidebar state in localStorage
    const handleStorageChange = () => {
      const minimizedState = localStorage.getItem("sidebarMinimized");
      if (minimizedState) {
        setSidebarMinimized(JSON.parse(minimizedState));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    // Set the selected artist when artists are loaded
    if (artists.length === 1) {
      setSelectedArtist(artists[0]);
    } else if (artists.length > 1 && !selectedArtist) {
      // Show artist selection modal if there are multiple artists
      setShowArtistSelectionModal(true);
    }
  }, [artists]);

  // Custom handler for sidebar tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // If switching to artists tab and there are multiple artists without a selection
    if (tab === "artists" && artists.length > 1 && !selectedArtist) {
      setShowArtistSelectionModal(true);
    }
  };

  const fetchArtists = async () => {
    try {
      // Get the logged-in manager data from localStorage
      const managerData = JSON.parse(localStorage.getItem("manager"));

      if (!managerData) {
        console.error("No manager data found in localStorage");
        return;
      }

      // Log the manager data to see its structure
      console.log("Manager data from localStorage:", managerData);
      console.log("Manager data keys:", Object.keys(managerData));

      // Find the manager ID property (could be _id, id, or manager_id)
      const managerId =
        managerData._id || managerData.id || managerData.manager_id;

      // If we can't find the ID in the common properties, try to find any property that might be an ID
      if (!managerId) {
        // Look for any property that contains "id" in its name (case insensitive)
        const idPropertyName = Object.keys(managerData).find((key) =>
          key.toLowerCase().includes("id")
        );

        if (idPropertyName) {
          console.log(
            `Found ID in property: ${idPropertyName} with value: ${managerData[idPropertyName]}`
          );
          const possibleId = managerData[idPropertyName];

          if (possibleId) {
            // Use this ID and continue with the fetch
            const response = await fetch("http://localhost:5000/api/artists");
            const allArtists = await response.json();

            console.log("All artists:", allArtists);

            // Filter artists to only show those added by the current manager
            const managerArtists = allArtists.filter((artist) => {
              // Check different possible property names for manager ID in artist data
              const artistManagerId =
                artist.m_id || artist.manager_id || artist.managerId;
              console.log(
                `Artist ${artist.stage_name} has manager ID: ${artistManagerId}`
              );
              return artistManagerId === possibleId;
            });

            console.log("Filtered artists for this manager:", managerArtists);
            setArtists(managerArtists);

            // If we have multiple artists and user is on artists tab, show selection modal
            if (
              managerArtists.length > 1 &&
              activeTab === "artists" &&
              !selectedArtist
            ) {
              setShowArtistSelectionModal(true);
            }

            return; // Exit early since we've handled this case
          }
        }

        // If we still can't find an ID, show a more helpful error message
        console.error(
          "Could not determine manager ID. Manager data:",
          managerData
        );
        alert(
          "Could not find your manager ID. Please log out and log in again. If the problem persists, contact support."
        );
        return;
      }

      console.log("Using manager ID:", managerId);

      const response = await fetch("http://localhost:5000/api/artists");
      const allArtists = await response.json();

      console.log("All artists:", allArtists);

      // Filter artists to only show those added by the current manager
      const managerArtists = allArtists.filter((artist) => {
        // Check different possible property names for manager ID in artist data
        const artistManagerId =
          artist.m_id || artist.manager_id || artist.managerId;
        console.log(
          `Artist ${artist.stage_name} has manager ID: ${artistManagerId}`
        );
        return artistManagerId === managerId;
      });

      console.log("Filtered artists for this manager:", managerArtists);
      setArtists(managerArtists);

      // If we have multiple artists and user is on artists tab, show selection modal
      if (
        managerArtists.length > 1 &&
        activeTab === "artists" &&
        !selectedArtist
      ) {
        setShowArtistSelectionModal(true);
      }
    } catch (error) {
      console.error("Error fetching artists:", error);
      alert(
        "An error occurred while fetching your artists. Please try again later."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddGenre = (e) => {
    e.preventDefault();
    if (genreInput.trim() && !formData.genres.includes(genreInput.trim())) {
      setFormData({
        ...formData,
        genres: [...formData.genres, genreInput.trim()],
      });
      setGenreInput("");
    }
  };

  const handleRemoveGenre = (genre) => {
    setFormData({
      ...formData,
      genres: formData.genres.filter((g) => g !== genre),
    });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (
      serviceInput.trim() &&
      !formData.services.includes(serviceInput.trim())
    ) {
      setFormData({
        ...formData,
        services: [...formData.services, serviceInput.trim()],
      });
      setServiceInput("");
    }
  };

  const handleRemoveService = (service) => {
    setFormData({
      ...formData,
      services: formData.services.filter((s) => s !== service),
    });
  };

  const openAddModal = () => {
    setFormData({
      stage_name: "",
      real_name: "",
      biography: "",
      base_price: "",
      cover_photo: "",
      genres: [],
      services: [],
      availability: "Available",
      mainstream: false,
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (artist) => {
    // Log the artist object to see its structure
    console.log("Opening edit modal for artist:", artist);
    console.log("Artist object keys:", Object.keys(artist));

    // Find the ID property
    const idPropertyName = Object.keys(artist).find((key) =>
      key.toLowerCase().includes("id")
    );

    const artistId = idPropertyName ? artist[idPropertyName] : null;
    console.log("Using ID for editing:", artistId);

    if (!artistId) {
      alert("Could not find ID for this artist");
      return;
    }

    setFormData({
      stage_name: artist.stage_name,
      real_name: artist.real_name,
      biography: artist.biography,
      base_price: artist.base_price,
      cover_photo: artist.cover_photo || "",
      genres: artist.genres || [],
      services: artist.services || [],
      availability: artist.availability || "Available",
      mainstream: artist.mainstream || false,
    });
    setIsEditing(true);
    setCurrentArtistId(artistId);
    setShowModal(true);
  };

  const initiateDelete = (artist) => {
    console.log("Artist to delete:", artist);

    // Try to find any property that might be an ID
    const possibleIdProperties = Object.keys(artist).find((key) =>
      key.toLowerCase().includes("id")
    );

    const artistId = possibleIdProperties ? artist[possibleIdProperties] : null;
    console.log(
      "Found ID property:",
      possibleIdProperties,
      "with value:",
      artistId
    );

    if (artistId) {
      setArtistToDelete({
        id: artistId,
        name: artist.stage_name,
      });
      setShowDeleteModal(true);
    } else {
      alert("Could not find ID for this artist");
    }
  };

  const handleDeleteArtist = async () => {
    const id = artistToDelete.id;

    try {
      console.log("Attempting to delete artist with ID:", id);

      const response = await fetch(`http://localhost:5000/api/artists/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setArtists((prevArtists) => {
          console.log("Filtering artists with ID:", id);

          // Find the property name that contains the ID
          const idPropertyName = Object.keys(prevArtists[0] || {}).find((key) =>
            key.toLowerCase().includes("id")
          );

          console.log("Using ID property for filtering:", idPropertyName);

          if (idPropertyName) {
            return prevArtists.filter(
              (artist) => artist[idPropertyName] !== id
            );
          }

          // Fallback to re-fetching
          fetchArtists();
          return prevArtists;
        });

        setShowDeleteModal(false);
        setSuccessMessage("Artist deleted successfully");
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        console.error("Failed to delete artist:", errorData);
        setShowDeleteModal(false);
        alert(
          `Failed to delete artist: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error deleting artist:", error);
      setShowDeleteModal(false);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the logged-in manager data from localStorage
    const managerData = JSON.parse(localStorage.getItem("manager"));

    if (!managerData) {
      alert("You must be logged in as a manager to perform this action");
      return;
    }

    console.log("Manager data for artist submission:", managerData);
    console.log("Manager data keys:", Object.keys(managerData));

    // Find the manager ID property (could be _id, id, or manager_id)
    let managerId = managerData._id || managerData.id || managerData.manager_id;

    // If we can't find the ID in the common properties, try to find any property that might be an ID
    if (!managerId) {
      // Look for any property that contains "id" in its name (case insensitive)
      const idPropertyName = Object.keys(managerData).find((key) =>
        key.toLowerCase().includes("id")
      );

      if (idPropertyName) {
        console.log(
          `Found ID in property: ${idPropertyName} with value: ${managerData[idPropertyName]}`
        );
        managerId = managerData[idPropertyName];
      }
    }

    if (!managerId) {
      console.error(
        "Could not determine manager ID. Manager data:",
        managerData
      );
      alert("Could not determine manager ID. Please log out and log in again.");
      return;
    }

    console.log("Using manager ID for artist submission:", managerId);

    const artistData = {
      ...formData,
      base_price: Number(formData.base_price),
      m_id: managerId, // Add the manager ID to the artist data
    };

    try {
      if (isEditing) {
        console.log("Updating artist with ID:", currentArtistId);
        console.log("Update data:", artistData);

        const response = await fetch(
          `http://localhost:5000/api/artists/${currentArtistId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(artistData),
          }
        );

        if (response.ok) {
          fetchArtists();
          setShowModal(false);
          setSuccessMessage("Artist updated successfully");
          setShowSuccessModal(true);
        } else {
          const errorData = await response.json();
          console.error("Failed to update artist:", errorData);
          alert(
            `Failed to update artist: ${errorData.message || "Unknown error"}`
          );
        }
      } else {
        const response = await fetch("http://localhost:5000/api/artists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(artistData),
        });

        if (response.ok) {
          fetchArtists();
          setShowModal(false);
          setSuccessMessage("Artist added successfully");
          setShowSuccessModal(true);
        } else {
          const errorData = await response.json();
          console.error("Failed to add artist:", errorData);
          alert(
            `Failed to add artist: ${errorData.message || "Unknown error"}`
          );
        }
      }
    } catch (error) {
      console.error("Error submitting artist data:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Function to truncate biography text
  const truncateBio = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Function to get availability badge class
  const getAvailabilityClass = (availability) => {
    switch (availability) {
      case "Available":
        return "availability-available";
      case "Busy":
        return "availability-busy";
      case "On Tour":
        return "availability-tour";
      case "Not Available":
        return "availability-unavailable";
      default:
        return "availability-available";
    }
  };

  // Render single artist view
  const renderSingleArtist = (artist) => {
    if (!artist) return null;

    return (
      <div className="single-artist-view">
        <div className="single-artist-header">
          <img
            src={artist.cover_photo || defaultCoverPhoto}
            alt={`${artist.stage_name}`}
            className="single-artist-image"
          />
          <div className="single-artist-info">
            <h1 className="single-artist-name">{artist.stage_name}</h1>
            <p className="single-artist-realname">{artist.real_name}</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div className="single-artist-price">
                <span>Rs. {Math.round(artist.base_price)}</span>
                <small> Base Price</small>
              </div>

              <span
                className={`availability-badge ${getAvailabilityClass(
                  artist.availability
                )}`}
              >
                {artist.availability}
              </span>

              {artist.mainstream && (
                <span className="mainstream-badge">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                  Mainstream
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="single-artist-details">
          <div className="detail-section">
            <h3>Biography</h3>
            <p>{artist.biography}</p>
          </div>

          {artist.genres && artist.genres.length > 0 && (
            <div className="detail-section">
              <h3>Genres</h3>
              <div className="tags-container">
                {artist.genres.map((genre, index) => (
                  <span key={index} className="tag-item">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {artist.services && artist.services.length > 0 && (
            <div className="detail-section">
              <h3>Services</h3>
              <div className="tags-container">
                {artist.services.map((service, index) => (
                  <span key={index} className="tag-item">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="single-artist-actions">
            <button className="edit-btn" onClick={() => openEditModal(artist)}>
              Edit Artist Details
            </button>
            <button
              className="delete-btn"
              onClick={() => initiateDelete(artist)}
            >
              Delete Artist
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render empty state when no artists
  const renderEmptyState = () => {
    return (
      <div className="empty-state">
        <h2>No Artists Added Yet</h2>
        <p>
          Start by adding your first artist to manage their bookings and
          profile.
        </p>
        <button onClick={openAddModal}>Add Your First Artist</button>
      </div>
    );
  };

  // Artist Selection Modal
  const renderArtistSelectionModal = () => {
    return (
      <div className="modal-overlay">
        <div className="modal-content artist-selection-modal">
          <div className="modal-header">
            <h2>Select an Artist</h2>
            {/* No close button - user must select an artist */}
          </div>
          <p className="selection-instruction">
            Please select which artist you want to view:
          </p>

          <div className="artist-selection-grid">
            {artists.map((artist) => (
              <div
                key={artist._id || artist.id}
                className="artist-selection-card"
                onClick={() => {
                  setSelectedArtist(artist);
                  setShowArtistSelectionModal(false);
                }}
              >
                <img
                  src={artist.cover_photo || defaultCoverPhoto}
                  alt={artist.stage_name}
                  className="selection-artist-image"
                />
                <div className="selection-artist-info">
                  <h3>{artist.stage_name}</h3>
                  <p>{artist.real_name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      <div
        className={`main-content ${
          sidebarMinimized ? "sidebar-minimized" : ""
        }`}
      >
        <div className="artists-header">
          <div className="header-left">
            <h1
              style={{
                color: "#333",
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Artist Management
            </h1>
          </div>

          <button className="add-artist-btn" onClick={openAddModal}>
            {artists.length === 0 ? (
              "Add Your First Artist"
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add Another Artist
              </>
            )}
          </button>
        </div>

        <div className="artists-content">
          {artists.length === 0
            ? renderEmptyState()
            : renderSingleArtist(selectedArtist || artists[0])}
        </div>
      </div>

      {/* Artist Selection Modal */}
      {showArtistSelectionModal && renderArtistSelectionModal()}

      {/* Add/Edit Artist Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{ padding: "20px", maxWidth: "800px" }}
          >
            <div className="modal-header">
              <h2>{isEditing ? "Edit Artist" : "Add New Artist"}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div
                className="form-grid"
                style={{ gap: "15px", marginTop: "10px" }}
              >
                <div className="form-group">
                  <label htmlFor="stage_name">Stage Name</label>
                  <input
                    type="text"
                    id="stage_name"
                    name="stage_name"
                    value={formData.stage_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="real_name">Real Name</label>
                  <input
                    type="text"
                    id="real_name"
                    name="real_name"
                    value={formData.real_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="base_price">Base Price (Rs.)</label>
                  <input
                    type="number"
                    id="base_price"
                    name="base_price"
                    value={formData.base_price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cover_photo">Cover Photo URL</label>
                  <input
                    type="text"
                    id="cover_photo"
                    name="cover_photo"
                    value={formData.cover_photo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="biography">Biography</label>
                  <textarea
                    id="biography"
                    name="biography"
                    value={formData.biography}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Genres</label>
                  <div className="tags-input">
                    {formData.genres.map((genre, index) => (
                      <div className="tag" key={index}>
                        {genre}
                        <button
                          type="button"
                          className="tag-remove"
                          onClick={() => handleRemoveGenre(genre)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <form onSubmit={handleAddGenre}>
                      <input
                        type="text"
                        value={genreInput}
                        onChange={(e) => setGenreInput(e.target.value)}
                        placeholder="Add genre and press Enter"
                      />
                    </form>
                  </div>
                </div>
                <div className="form-group">
                  <label>Services</label>
                  <div className="tags-input">
                    {formData.services.map((service, index) => (
                      <div className="tag" key={index}>
                        {service}
                        <button
                          type="button"
                          className="tag-remove"
                          onClick={() => handleRemoveService(service)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <form onSubmit={handleAddService}>
                      <input
                        type="text"
                        value={serviceInput}
                        onChange={(e) => setServiceInput(e.target.value)}
                        placeholder="Add service and press Enter"
                      />
                    </form>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="availability">Availability</label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="On Tour">On Tour</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Mainstream Status</label>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="mainstream"
                      name="mainstream"
                      checked={formData.mainstream}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="mainstream">
                      Mark as Mainstream Artist
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="submit-btn"
                style={{ marginTop: "20px" }}
              >
                {isEditing ? "Update Artist" : "Add Artist"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div
            style={{
              maxWidth: "500px",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              padding: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "5px 5px 10px",
              }}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "#666",
                }}
                onClick={() => setShowDeleteModal(false)}
              >
                ×
              </button>
            </div>

            <div
              style={{
                padding: "5px 15px 15px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  color: "#333",
                  marginBottom: "20px",
                }}
              >
                Are you sure you want to delete the artist "
                {artistToDelete.name}"?
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  marginTop: "15px",
                }}
              >
                <button
                  style={{
                    padding: "8px 20px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    background: "#f5f5f5",
                    color: "#333",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  style={{
                    padding: "8px 20px",
                    borderRadius: "4px",
                    border: "none",
                    background: "#d9534f",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                  onClick={handleDeleteArtist}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{
              maxWidth: "500px",
              background: "white",
              padding: "20px",
            }}
          >
            <div className="modal-header" style={{ marginBottom: "10px" }}>
              <h2>Success</h2>
              <button
                className="close-btn"
                onClick={() => setShowSuccessModal(false)}
              >
                ×
              </button>
            </div>
            <div style={{ padding: "25px 0", textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#4CAF50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <span style={{ color: "white", fontSize: "30px" }}>✓</span>
              </div>
              <p style={{ fontSize: "18px", color: "#333" }}>
                {successMessage}
              </p>
            </div>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                background: "var(--primary)",
                color: "white",
                cursor: "pointer",
                width: "100%",
                marginTop: "15px",
                fontSize: "16px",
              }}
              onClick={() => setShowSuccessModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artists;
