require("reflect-metadata");
const { DataSource } = require("typeorm");

const Clients = require("../entities/Clients");

const Managers = require("../entities/Managers");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "ason", // This should match your PostgreSQL password
  database: "artists", // This matches your database name
  entities: [
    require("../entities/Artists"),
    require("../entities/Managers"), // Add Managers entity
  ],


  synchronize: false,
  logging: true,
  migrations: ["migrations/*.js"],
});

module.exports = AppDataSource; // Export directly, not as an object
