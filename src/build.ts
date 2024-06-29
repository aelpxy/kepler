import Fastify, { type FastifyInstance } from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import fastifyEtag from '@fastify/etag';

import redisInstance from '@/adapters/redis';

import { loggerConfig } from '@/utils/logger';
import { id } from '@/utils/id';
import { appConfig } from '@/config/app.config';

declare module 'fastify' {
    interface FastifyError {
        type: string;
    }
}

const buildServer = () => {
    const app: FastifyInstance = Fastify({
        trustProxy: true,
        logger: loggerConfig,
        genReqId() {
            return id.generateCUID('req', 16);
        },
    });

    app.register(helmet);
    app.register(cors, {
        origin: appConfig.ORIGIN,
    });
    app.register(rateLimit, {
        global: true,
        max: 10,
        ban: 11,
        timeWindow: '1 minute',
        nameSpace: 'rate-limit',
        redis: redisInstance,
    });
    app.register(fastifyEtag);

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.setNotFoundHandler((request, reply) =>
        reply.code(404).send({
            error: {
                message: `Unrecognized request URL (${request.method}: ${request.url}).`,
                type: 'invalid_request',
            },
        })
    );

    app.setErrorHandler((error, _, reply) => {
        if (error.statusCode === 400) {
            error.type = 'validation_error';
        }

        if (error.statusCode === 429) {
            error.type = 'rate_limited';
        }

        return reply.status(error.statusCode as number).send({
            error: {
                message: error.message,
                type: error.type || 'internal_error',
            },
        });
    });

    app.addHook('onSend', async (request, reply, payload) => {
        reply.header('X-Request-ID', request.id);

        return payload;
    });

    return app;
};

export default buildServer;
