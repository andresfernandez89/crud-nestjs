import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731430739017 implements MigrationInterface {
    name = 'Migration1731430739017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "UQ_809228ed8520ca85998fe55165f" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "UQ_809228ed8520ca85998fe55165f"`);
    }

}
