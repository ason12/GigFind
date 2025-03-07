const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserTable1740602202013 {
    name = 'CreateUserTable1740602202013'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Managers" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "Managers" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "Managers" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Managers" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Managers" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Managers" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "Managers" ADD "last_name" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "Managers" ADD "first_name" character varying(100)`);
    }
}
