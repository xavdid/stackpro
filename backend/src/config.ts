import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  port: 5432,
  synchronize: process.env.NODE_ENV !== 'production',
}
