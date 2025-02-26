const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserTable1740388741174 {
    name = 'CreateUserTable1740388741174'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" DROP COLUMN "updated_at"`);
    }
}
