const { EntitySchema } = require("typeorm");

const Artists = new EntitySchema({
  name: "Artists",
  tableName: "Artists",
  columns: {
    a_id: {
      type: "int",
      primary: true,
      generated: true, // Equivalent to SERIAL in SQL
    },
    m_id: {
      type: "int",
      nullable: true, // Allows null if there's no manager assigned
    },
    stage_name: {
      type: "varchar",
      length: 255,
      nullable: false, // Stage name is mandatory
    },
    real_name: {
      type: "varchar",
      length: 255,
      nullable: true, // Optional
    },

    cover_photos: {
      type: "varchar",
      nullable: true,
    },

    biography: {
      type: "text",
      nullable: true, // Optional
    },
    genres: {
      type: "simple-array", // Array of strings
      nullable: true,
    },
    base_price: {
      type: "decimal",
      precision: 10,
      scale: 2, // Decimal with 2 decimal places
      nullable: true,
    },

    services: {
      type: "jsonb",
      nullable: true,
      default: "[]", // Default to empty JSON array
    },
    availability: {
      type: "jsonb",
      nullable: true,
      default: "[]", // Default to empty JSON array
    },
    created_at: {
      type: "timestamp",
      createDate: true, // Automatically set when the record is created
    },
  },
  relations: {
    manager: {  // Use lowercase 'manager' instead of 'Managers'
        target: "Managers",
        type: "many-to-one",
        joinColumn: { name: "m_id" },
        nullable: true
    }
}
});

module.exports = Artists;
