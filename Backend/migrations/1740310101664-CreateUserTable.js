const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserTable1740310101664 {
    name = 'CreateUserTable1740310101664'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" RENAME COLUMN "cover_photos" TO "cover_photo"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" RENAME COLUMN "cover_photo" TO "cover_photos"`);
    }
}
