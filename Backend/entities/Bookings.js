const { EntitySchema } = require("typeorm");

const Bookings = new EntitySchema({
  name: "Bookings",
  tableName: "Bookings",
  columns: {
    b_id: {
      type: "int",
      primary: true,
      generated: true, // Equivalent to SERIAL in SQL
    },
    a_id: {
      type: "int",
      nullable: false, // Ensures every booking is linked to an artist
    },
    joinColumn_id: {
      type: "int",
      nullable: false, // Ensures every booking is linked to a client
    },
    event_date: {
      type: "date",
      nullable: false, // Event date is mandatory
    },
    event_location: {
      type: "text",
      nullable: true, // Optional field to store event location
    },
    event_details: {
      type: "text",
      nullable: true, // Optional field for event description/details
    },
    status: {
      type: "varchar",
      length: 50,
      default: "pending", // Default status is 'pending'
    },
    budget: {
      type: "decimal",
      precision: 10,
      scale: 2, // Budget amount (with two decimal places)
      nullable: true,
    },
    deposit_amount: {
      type: "decimal",
      precision: 10,
      scale: 2, // Deposit amount (with two decimal places)
      nullable: true,
    },
    deposit_paid: {
      type: "boolean",
      default: false, // Default is false, indicating deposit not paid
    },
    created_at: {
      type: "timestamp",
      createDate: true, // Automatically set when the record is created
    },
  },
  relations: {
    Artists: {
      target: "Artists",
      type: "many-to-one",
      joinColumn: { name: "a_id" },
      nullable: false, // Ensures a booking must be linked to an artist
    },
    Clients: { 
      target: "Clients",
      type: "many-to-one",
      joinColumn: { name: "c_id" },
      nullable: false, // Ensures a booking must be linked to a client
    },
  },
});

module.exports = Bookings;
