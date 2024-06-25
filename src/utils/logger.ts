import fastify, { FastifyInstance, FastifyRequest } from 'fastify';

interface LoggerConfig {
    level: string;
    redact: string[];
    serializers: {
        req(request: FastifyRequest): {
            method: string;
            url: string;
            hostname: string;
            remoteAddress: string;
            remotePort: number | undefined;
        };
    };
}

const loggerConfig: LoggerConfig = {
    level: 'info',
    redact: ['headers.authorization'],
    serializers: {
        req(request) {
            return {
                method: request.method,
                url: request.url,
                hostname: request.hostname,
                remoteAddress: request.ip,
                remotePort: request.socket.remotePort,
            };
        },
    },
};

const app: FastifyInstance = fastify({ logger: loggerConfig });
const logger = app.log;

export { loggerConfig, logger };
