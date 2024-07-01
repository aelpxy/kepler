import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import { Pool } from 'pg';

import { appConfig } from '@/config/app.config';
import { logger } from '@/utils/logger';
import * as schema from '@/db/schema';

export let db: PostgresJsDatabase<typeof schema>;

export const connectToDb = async () => {
    const pool = await new Pool({
        connectionString: appConfig.DATABASE_URL,
    })
        .connect()
        .then((client) => {
            logger.info('Connected to PostgreSQL');
            return client;
        })
        .catch((error) => {
            logger.info('Disconnecting from database');
            logger.error(error);
        });

    db = drizzle(pool, { schema });
};
