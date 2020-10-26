import {MigrationInterface, QueryRunner} from "typeorm";

export class Recording1603683794254 implements MigrationInterface {
    name = 'Recording1603683794254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recording" ("id" SERIAL NOT NULL, "asked" integer NOT NULL, "answered" integer NOT NULL, "unixTs" integer NOT NULL, "collectedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_2f037d57bd6d7f1e4d68d72e6f4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recording"`);
    }

}
