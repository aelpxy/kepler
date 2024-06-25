import * as z from 'zod';

export const getUserRepositorySchema = z.object({
    id: z.string(),
    avatar_hash: z.string().optional(),
    avatar: z.string(),
    name: z.string().optional(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    two_fa_key: z.string().optional(),
    verified: z.boolean(),
    two_fa: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
});
