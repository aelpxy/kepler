import type { FastifyReply, FastifyRequest } from 'fastify';

export default {
    async signIn(
        request: FastifyRequest<{ Body: { email: string } }>,
        reply: FastifyReply
    ) {
        const { email } = request.body;

        return reply.status(200).send({
            data: {
                email,
            },
        });
    },

    async signUp(
        request: FastifyRequest<{ Body: { email: string } }>,
        reply: FastifyReply
    ) {
        const { email } = request.body;

        return reply.status(200).send({
            data: {
                email,
            },
        });
    },
};
