import { MigrationInterface, QueryRunner } from "typeorm"

export class Init1703215764569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.users
            (
                id serial,
                username character varying(255) unique NOT NULL,
                hashed_password character varying(255),
                salt character varying(255),
                role_id integer,
                email character varying(255),
                phone character varying(255),
                status character varying(255),
                created_at timestamp without time zone,
                updated_at timestamp without time zone,
                CONSTRAINT users_pkey PRIMARY KEY (id)
            );
        
            CREATE TABLE IF NOT EXISTS public.feature_flags
            (
                id serial,
                account_id character varying(255) NOT NULL,
                name character varying(255) NOT NULL,
                is_enabled boolean NOT NULL,
                created_at timestamp without time zone,
                updated_at timestamp without time zone,
                CONSTRAINT feature_flags_pkey PRIMARY KEY (account_id, name)
            );

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
