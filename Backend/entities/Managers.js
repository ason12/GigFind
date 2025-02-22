const { EntitySchema } = require("typeorm");

const Managers = new EntitySchema({
  name: "Managers",
  tableName: "Managers",
  columns: {
    m_id: {
      type: "int",
      primary: true,
      generated: true, // Equivalent to SERIAL
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
    first_name: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    last_name: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    company_name: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    phone: {
      type: "varchar",
      length: 50,
      nullable: true,
    },
    created_at: {
      type: "timestamp",
      createDate: true, // Automatically sets to CURRENT_TIMESTAMP
    },
  },
  relations: {
    artists: {  // Use lowercase 'artists'
        type: "one-to-many",
        target: "Artists",
        inverseSide: "manager"  // This should match the property name in Artists entity
    }
}
});

module.exports = Managers;
