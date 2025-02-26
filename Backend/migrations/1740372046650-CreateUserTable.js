const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserTable1740372046650 {
    name = 'CreateUserTable1740372046650'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" ADD "mainstream" boolean NOT NULL DEFAULT false`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" DROP COLUMN "mainstream"`);
    }
}
