import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactsTable1760000000000 implements MigrationInterface {
  name = 'CreateContactsTable1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "contacts" (
        "id" SERIAL NOT NULL,
        "first_name" character varying(50) NOT NULL,
        "last_name" character varying(50) NOT NULL,
        "phone_number" character varying(30) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_contacts_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contacts"`);
  }
}
