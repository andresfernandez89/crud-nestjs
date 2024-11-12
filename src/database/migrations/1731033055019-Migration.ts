import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1731033055019 implements MigrationInterface {
  name = 'Migration1731033055019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "operator" ("id" SERIAL NOT NULL, "email" character varying(254) NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "buyerId" integer, CONSTRAINT "REL_ca6bdfbf53a9822a9f20999d1f" UNIQUE ("buyerId"), CONSTRAINT "PK_8b950e1572745d9f69be7748ae8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "buyer" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "buyer" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "manufacturer" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "manufacturer" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "operator" ADD CONSTRAINT "FK_ca6bdfbf53a9822a9f20999d1f3" FOREIGN KEY ("buyerId") REFERENCES "buyer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "operator" DROP CONSTRAINT "FK_ca6bdfbf53a9822a9f20999d1f3"`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createAt"`);
    await queryRunner.query(
      `ALTER TABLE "manufacturer" DROP COLUMN "updateAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "manufacturer" DROP COLUMN "createAt"`,
    );
    await queryRunner.query(`ALTER TABLE "buyer" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "buyer" DROP COLUMN "createAt"`);
    await queryRunner.query(`DROP TABLE "operator"`);
  }
}
