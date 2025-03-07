const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserTable1740816397255 {
    name = 'CreateUserTable1740816397255'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Clients" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "Clients" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "Clients" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "Clients" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Managers" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Managers" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Clients" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "Clients" ADD "company" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "Clients" ADD "last_name" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "Clients" ADD "first_name" character varying(100)`);
    }
}
