const AppDataSource = require("../config/data-source");
const Managers = require("../entities/Managers");

const managersRepository = AppDataSource.getRepository(Managers);

class ManagersController {
  // Create a new manager
  async create(req, res) {
    try {
      const { email, password, name, company_name, phone } = req.body;

      // Validate required fields
      if (!email || !password || !name) {
        return res.status(400).json({
          message: "Email, password, and name are required fields",
        });
      }

      // Store password directly without hashing
      const manager = await managersRepository.save({
        email,
        password, // No longer hashing the password
        name,
        company_name: company_name || null,
        phone: phone || null,
      });

      // Remove password from response
      const { password: _, ...managerData } = manager;

      res.status(201).json(managerData);
    } catch (error) {
      console.error("Error creating manager:", error);
      res.status(500).json({ message: error.message });
    }
  }

  // Get all managers
  async getAll(req, res) {
    try {
      const managers = await managersRepository.find();
      res.json(managers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get manager by ID
  async getOne(req, res) {
    try {
      const manager = await managersRepository.findOne({
        where: { m_id: parseInt(req.params.id) },
      });

      if (!manager) {
        return res.status(404).json({ message: "Manager not found" });
      }

      res.json(manager);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update manager
  async update(req, res) {
    try {
      const manager = await managersRepository.findOne({
        where: { m_id: parseInt(req.params.id) },
      });

      if (!manager) {
        return res.status(404).json({ message: "Manager not found" });
      }

      // No longer hashing password on update
      await managersRepository.update(req.params.id, req.body);

      const updatedManager = await managersRepository.findOne({
        where: { m_id: parseInt(req.params.id) },
      });

      res.json(updatedManager);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete manager
  async delete(req, res) {
    try {
      const result = await managersRepository.delete(req.params.id);

      if (result.affected === 0) {
        return res.status(404).json({ message: "Manager not found" });
      }

      res.json({ message: "Manager deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ManagersController();
