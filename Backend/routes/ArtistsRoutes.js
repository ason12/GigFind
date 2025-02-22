const express = require("express");
const router = express.Router();
const {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
} = require("../controller/ArtistsController");

// Artist routes
router.get("/", getAllArtists);
router.get("/:id", getArtistById);
router.post("/", createArtist);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);

module.exports = router;
