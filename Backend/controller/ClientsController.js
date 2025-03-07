const AppDataSource = require("../config/data-source");
const Clients = require("../entities/Clients");

const clientsRepository = AppDataSource.getRepository(Clients);

class ClientsController {
  // Create a new client
  async create(req, res) {
    try {
      const { email, password, first_name, last_name, phone, company } =
        req.body;

      // Validate required fields
      if (!email || !password || !first_name) {
        return res.status(400).json({
          message: "Email, password, and first name are required fields",
        });
      }

      const client = await clientsRepository.save({
        email,
        password,
        first_name,
        last_name: last_name || null,
        phone: phone || null,
        company: company || null,
      });

      // Remove password from response
      const { password: _, ...clientData } = client;

      res.status(201).json(clientData);
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).json({ message: error.message });
    }
  }

  // Get all clients
  async getAll(req, res) {
    try {
      const clients = await clientsRepository.find();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get client by ID
  async getOne(req, res) {
    try {
      const client = await clientsRepository.findOne({
        where: { c_id: parseInt(req.params.id) },
      });

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.json(client);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update client
  async update(req, res) {
    try {
      const client = await clientsRepository.findOne({
        where: { c_id: parseInt(req.params.id) },
      });

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      await clientsRepository.update(req.params.id, req.body);

      const updatedClient = await clientsRepository.findOne({
        where: { c_id: parseInt(req.params.id) },
      });

      res.json(updatedClient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete client
  async delete(req, res) {
    try {
      const result = await clientsRepository.delete(req.params.id);

      if (result.affected === 0) {
        return res.status(404).json({ message: "Client not found" });
      }

      res.json({ message: "Client deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ClientsController();
