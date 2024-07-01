import { pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core';

export const users = pgTable(
    'users',
    {
        id: text('id').notNull().unique().primaryKey(),
        avatarPath: text('avatar_path').notNull().unique(),
        username: text('username').notNull().unique(),
        email: text('email').notNull().unique(),
    },
    (table) => {
        return {
            usernameIdx: uniqueIndex('username_idx').on(table.username),
            emailIdx: uniqueIndex('email_idx').on(table.email),
        };
    }
);
