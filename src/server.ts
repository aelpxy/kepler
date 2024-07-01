import { appConfig } from '@/config/app.config';
import buildServer from '@/build';

import { connectToDb } from '@/adapters/db';

const server = buildServer();

const start = async (port: number, host: string) => {
    try {
        server.log.info(`Starting server in ${appConfig.ENVIRONMENT} mode`);

        await connectToDb();

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

    server.log.info('Shutting server down');
    await server.close();

    server.log.info('Server is shut down');
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default start;
