import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731782114016 implements MigrationInterface {
    name = 'Migration1731782114016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "manufacturerId" integer`);
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "FK_ca6bdfbf53a9822a9f20999d1f3"`);
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "UQ_809228ed8520ca85998fe55165f" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "UQ_ca6bdfbf53a9822a9f20999d1f3" UNIQUE ("buyerId")`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_da883f8d02581a40e6059bd7b38" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "FK_ca6bdfbf53a9822a9f20999d1f3" FOREIGN KEY ("buyerId") REFERENCES "buyer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "FK_ca6bdfbf53a9822a9f20999d1f3"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_da883f8d02581a40e6059bd7b38"`);
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "UQ_ca6bdfbf53a9822a9f20999d1f3"`);
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "UQ_809228ed8520ca85998fe55165f"`);
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "FK_ca6bdfbf53a9822a9f20999d1f3" FOREIGN KEY ("buyerId") REFERENCES "buyer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "manufacturerId"`);
    }

}
