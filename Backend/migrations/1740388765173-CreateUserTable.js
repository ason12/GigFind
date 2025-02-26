const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserTable1740388765173 {
    name = 'CreateUserTable1740388765173'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" DROP COLUMN "updated_at"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }
}
