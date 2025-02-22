const { EntitySchema } = require("typeorm");

const Messages = new EntitySchema({
  name: "Messages",
  tableName: "Messages",
  columns: {
    message_id: {
      type: "int",
      primary: true,
      generated: true, // Equivalent to SERIAL in SQL
    },
    b_id: {
      type: "int",
      nullable: false, // Ensures the message is linked to a booking
    },
    sender_type: {
      type: "varchar",
      length: 50,
      nullable: false, // Sender type is required ('manager' or 'client')
    },
    sender_id: {
      type: "int",
      nullable: false, // Sender ID is required (manager or client)
    },
    receiver_type: {
      type: "varchar",
      length: 50,
      nullable: false, // Receiver type is required ('manager' or 'client')
    },
    receiver_id: {
      type: "int",
      nullable: false, // Receiver ID is required (manager or client)
    },
    message_text: {
      type: "text",
      nullable: false, // Message text is required
    },
    created_at: {
      type: "timestamp",
      createDate: true, // Automatically set when the message is created
    },
  },
  relations: {
    Bookings: {
      target: "Bookings",
      type: "many-to-one",
      joinColumn: { name: "b_id" },
      nullable: false, // Each message must be related to a booking
    },
  },
});

module.exports = Messages;
