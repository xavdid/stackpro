import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import { join } from 'path'

// copied from here: https://wanago.io/2019/01/28/typeorm-migrations-postgres/

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  port: 5432,
  entities: [join(__dirname, '/entity/*{.ts,.js}')],
  migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
  cli: {
    // tells the CLI where to write migration files
    migrationsDir: 'src/migrations',
  },
}

export = typeOrmConfig
