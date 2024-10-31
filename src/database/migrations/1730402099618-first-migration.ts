import { MigrationInterface, QueryRunner } from 'typeorm';

export class firstMigration1730402099618 implements MigrationInterface {
  name = 'firstMigration1730402099618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "buyer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "phone" character varying(20) NOT NULL, CONSTRAINT "PK_0480fc3c7289846a31b8e1bc503" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "manufacturer" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "address" character varying NOT NULL, "email" character varying(254) NOT NULL, "image" character varying NOT NULL, CONSTRAINT "UQ_a4687de45b74542072a2656b77d" UNIQUE ("name"), CONSTRAINT "PK_81fc5abca8ed2f6edc79b375eeb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "manufacturer"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "buyer"`);
  }
}
