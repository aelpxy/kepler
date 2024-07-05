import type { FastifyRequest, FastifyReply } from 'fastify';
import { handleHttpException } from '@/utils/http';

export default {
    async signIn(
        request: FastifyRequest<{ Body: { email: string } }>,
        reply: FastifyReply
    ) {
        try {
            const { email } = request.body;

            return reply.status(200).send({
                data: {
                    email,
                },
            });
        } catch (error) {
            return handleHttpException(reply, error);
        }
    },

    async signUp(
        request: FastifyRequest<{ Body: { email: string } }>,
        reply: FastifyReply
    ) {
        try {
            const { email } = request.body;

            return reply.status(200).send({
                data: {
                    email,
                },
            });
        } catch (error) {
            return handleHttpException(reply, error);
        }
    },
};
