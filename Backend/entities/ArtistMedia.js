const { EntitySchema } = require("typeorm");

const ArtistMedia = new EntitySchema({
  name: "ArtistMedia",
  tableName: "ArtistMedia",
  columns: {
    media_id: {
      type: "int",
      primary: true,
      generated: true, // Equivalent to SERIAL in SQL
    },
    a_id: {
      type: "int",
      nullable: false, // Ensures every media entry has an artist
    },
    media_type: {
      type: "varchar",
      length: 50,
      nullable: true, // Optional field to describe the type of media (photo, video, etc.)
    },
    media_url: {
      type: "varchar",
      length: 255,
      nullable: false, // The URL is mandatory for media items
    },
    is_public: {
      type: "boolean",
      default: true, // Defaults to true, indicating media is public unless specified otherwise
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
      nullable: false, // Ensures each media item must be linked to an artist
    },
  },
});

module.exports = ArtistMedia;
