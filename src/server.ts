import { appConfig } from '@/config/app.config';
import buildServer from '@/build';

import db from '@/adapters/db';

const server = buildServer();

const start = (port: number, host: string): void => {
    try {
        server.log.info(`Starting server in ${appConfig.ENVIRONMENT} mode`);

        db.$connect()
            .then(() => server.log.info('Connected to PostgreSQL'))
            .catch((error) => {
                server.log.error(error);
                process.exit(1);
            });

        server
            .listen({ port, host })
            .then(() =>
                server.log.info('Server is now ready to serve requests')
            );
    } catch (error) {
        shutdown();
    }
};

const shutdown = async () => {
    server.log.info('Starting graceful shutdown');

    server.log.info('Disconnecting from database');
    await db.$disconnect();

    server.log.info('Shutting server down');
    await server.close();

    server.log.info('Server is shut down');
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default start;
