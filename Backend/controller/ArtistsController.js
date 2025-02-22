const AppDataSource = require("../config/data-source");
const Artists = require("../entities/Artists");

// Get all artists
const getAllArtists = async (req, res) => {
  try {
    const artistRepository = AppDataSource.getRepository(Artists);
    const artists = await artistRepository.find({
      relations: ["manager"], // Include manager relations
    });
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single artist by ID
const getArtistById = async (req, res) => {
  try {
    const artistRepository = AppDataSource.getRepository(Artists);
    const artist = await artistRepository.findOne({
      where: { a_id: parseInt(req.params.id) },
      relations: ["manager"],
    });

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new artist
const createArtist = async (req, res) => {
  try {
    const artistRepository = AppDataSource.getRepository(Artists);
    const newArtist = artistRepository.create({
      m_id: req.body.m_id,
      stage_name: req.body.stage_name,
      real_name: req.body.real_name,
      biography: req.body.biography,
      genres: req.body.genres,
      base_price: req.body.base_price,
      services: req.body.services || [],
      availability: req.body.availability || [],
    });

    const savedArtist = await artistRepository.save(newArtist);
    res.status(201).json(savedArtist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update artist
const updateArtist = async (req, res) => {
  try {
    const artistRepository = AppDataSource.getRepository(Artists);
    const artist = await artistRepository.findOne({
      where: { a_id: parseInt(req.params.id) },
    });

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    // Update only provided fields
    Object.assign(artist, req.body);

    const updatedArtist = await artistRepository.save(artist);
    res.status(200).json(updatedArtist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete artist
const deleteArtist = async (req, res) => {
  try {
    const artistRepository = AppDataSource.getRepository(Artists);
    const artist = await artistRepository.findOne({
      where: { a_id: parseInt(req.params.id) },
    });

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    await artistRepository.remove(artist);
    res.status(200).json({ message: "Artist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllArtists,
  getArtistById,
  createArtist,
  updateArtist,
  deleteArtist,
};
