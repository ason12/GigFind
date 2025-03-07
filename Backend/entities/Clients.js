const { EntitySchema } = require("typeorm");

const Clients = new EntitySchema({
  name: "Clients",
  tableName: "Clients",
  columns: {
    c_id: {
      type: "int",
      primary: true,
      generated: true, // Equivalent to SERIAL in SQL
    },
    email: {
      type: "varchar",
      length: 255,
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    name: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    phone: {
      type: "varchar",
      length: 50,
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      createDate: true, // Equivalent to DEFAULT CURRENT_TIMESTAMP
    },
  },
});

module.exports = Clients;
