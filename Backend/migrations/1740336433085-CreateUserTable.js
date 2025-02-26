const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserTable1740336433085 {
    name = 'CreateUserTable1740336433085'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" ADD "address" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" DROP COLUMN "address"`);
    }
}
