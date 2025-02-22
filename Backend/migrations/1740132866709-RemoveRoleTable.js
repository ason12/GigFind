const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class RemoveRoleTable1740132866709 {
    name = 'RemoveRoleTable1740132866709'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" ADD "cover_photos" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Artists" DROP COLUMN "cover_photos"`);
    }
}
