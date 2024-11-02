import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730547021848 implements MigrationInterface {
    name = 'Migration1730547021848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manufacturer" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "manufacturer" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manufacturer" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "manufacturer" DROP COLUMN "createAt"`);
    }

}
