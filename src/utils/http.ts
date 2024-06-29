import type { IncomingMessage, ServerResponse } from 'node:http';
import type {
    FastifyReply,
    FastifySchema,
    FastifyTypeProviderDefault,
    RawServerDefault,
    RouteGenericInterface,
} from 'fastify';

type ErrorType =
    | 'access_denied'
    | 'api_error'
    | 'conflict'
    | 'duplicate_entry'
    | 'internal_error'
    | 'invalid_input'
    | 'invalid_request'
    | 'resource_missing'
    | 'validation_error'
    | 'rate_limited';

interface HttpError {
    message: string;
    type: ErrorType;
}

class HttpException extends Error {
    statusCode: number;
    error: HttpError;

    constructor(statusCode: number, message: string, type: ErrorType) {
        super(message);
        this.name = 'HttpException';
        this.statusCode = statusCode;
        this.error = {
            message,
            type,
        };

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(message).stack;
        }
    }
}

function handleHttpException(reply: FastifyReply, error: HttpException) {
    reply.status(error.statusCode || 500).send({
        error: {
            message: error.message,
            type: error.error.type,
        },
    });
}

function handleHttpExceptionError(
    error: HttpException,
    reply: FastifyReply<
        RawServerDefault,
        IncomingMessage,
        ServerResponse<IncomingMessage>,
        RouteGenericInterface,
        unknown,
        FastifySchema,
        FastifyTypeProviderDefault,
        unknown
    >
) {
    if (error instanceof HttpException) {
        return handleHttpException(reply, error);
    }

    return handleHttpException(
        reply,
        new HttpException(
            500,
            'An unexpected error occurred while processing your request. Please try again later.',
            'api_error'
        )
    );
}

export { HttpException, handleHttpException, handleHttpExceptionError };
