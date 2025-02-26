const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserTable1740369886256 {
    name = 'CreateUserTable1740369886256'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" DROP COLUMN "genres"`);
        await queryRunner.query(`CREATE TYPE "public"."Artists_genres_enum" AS ENUM('Pop', 'Folk', 'Rock', 'Hip-hop/Rap', 'Indie', 'Classical', 'EDM', 'Electrical', 'Alternative Rock', 'Reggae', 'Blues', 'Jazz', 'R&B/Soul', 'Metal', 'Psychedelic', 'Ballad', 'Fusion', 'Punk', 'Country', 'Funk', 'Post-Rock', 'K-POP', 'Lok Geet', 'Newari', 'Bhajan', 'Spiritual', 'Cultural', 'Religious', 'Others')`);
        await queryRunner.query(`ALTER TABLE "Artists" ADD "genres" "public"."Artists_genres_enum" array`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" DROP COLUMN "genres"`);
        await queryRunner.query(`DROP TYPE "public"."Artists_genres_enum"`);
        await queryRunner.query(`ALTER TABLE "Artists" ADD "genres" text`);
    }
}
