import { appConfig } from '@/config/app.config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: appConfig.DATABASE_URL as string,
    },
    verbose: true,
    strict: true,
});
