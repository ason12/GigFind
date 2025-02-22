const AppDataSource = require("../config/data-source");
const Managers = require("../entities/Managers");


// Get all managers
const getAllManagers = async (req, res) => {
  try {
    const managerRepository = AppDataSource.getRepository(Managers);
    const managers = await managerRepository.find({
      relations: ["artists"], // Include artist relations
    });
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single manager by ID
const getManagerById = async (req, res) => {
  try {
    const managerRepository = AppDataSource.getRepository(Managers);
    const manager = await managerRepository.findOne({
      where: { m_id: parseInt(req.params.id) },
      relations: ["artists"],
    });

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new manager
const createManager = async (req, res) => {
  try {
    const managerRepository = AppDataSource.getRepository(Managers);
    const newManager = managerRepository.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
      experience_years: req.body.experience_years,
      specialization: req.body.specialization || [],
      active: req.body.active !== undefined ? req.body.active : true,
    });

    const savedManager = await managerRepository.save(newManager);
    res.status(201).json(savedManager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update manager
const updateManager = async (req, res) => {
  try {
    const managerRepository = AppDataSource.getRepository(Managers);
    const manager = await managerRepository.findOne({
      where: { m_id: parseInt(req.params.id) },
    });

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // Update only provided fields
    Object.assign(manager, req.body);

    const updatedManager = await managerRepository.save(manager);
    res.status(200).json(updatedManager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete manager
const deleteManager = async (req, res) => {
  try {
    const managerRepository = AppDataSource.getRepository(Managers);
    const manager = await managerRepository.findOne({
      where: { m_id: parseInt(req.params.id) },
    });

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    await managerRepository.remove(manager);
    res.status(200).json({ message: "Manager deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllManagers,
  getManagerById,
  createManager,
  updateManager,
  deleteManager,
};
