const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AppDataSource = require("./config/data-source");

const artistRoutes = require("./routes/ArtistsRoutes");
const managerRoutes = require("./routes/ManagersRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api/artists", artistRoutes);
app.use("/api/managers", managerRoutes);
// Add this route before other routes to test
app.get("/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
