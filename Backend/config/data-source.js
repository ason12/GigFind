require("reflect-metadata");
const { DataSource } = require("typeorm");
require("dotenv").config();

const Artists = require("../entities/Artists");
const Managers = require("../entities/Managers");
const Clients = require("../entities/Clients");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Artists, Managers, Clients],

  synchronize: false,
  logging: true,
  migrations: ["migrations/*.js"],
});

module.exports = AppDataSource; // Export directly, not as an object
