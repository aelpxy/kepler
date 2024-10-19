import { users } from '@/db/schema';
import SharedServiceBase from '@/shared/shared-service';

import { eq } from 'drizzle-orm';

export class UserRepository {
    private sharedService: SharedServiceBase;

    constructor() {
        this.sharedService = new SharedServiceBase();
    }

    public async findById(id: string) {
        const user = await this.sharedService.db
            .select()
            .from(users)
            .where(eq(users.id, id));

        return user;
    }

    public async findByEmail(email: string) {
        const user = await this.sharedService.db
            .select()
            .from(users)
            .where(eq(users.email, email));

        return user;
    }

    public async create(params: {
        avatarPath: string;
        username: string;
        email: string;
    }) {
        return await this.sharedService.db
            .insert(users)
            .values({
                id: this.sharedService.id.generateCUID('user', 16),
                avatarPath: params.avatarPath,
                username: params.username,
                email: params.email,
            })
            .returning({ id: users.id });
    }

    public async update(
        id: string,
        newData: {
            avatarPath: string;
            username: string;
            email: string;
        }
    ) {
        return await this.sharedService.db
            .update(users)
            .set(newData)
            .where(eq(users.id, id))
            .returning({
                id: users.id,
            });
    }

    public async delete(id: string) {
        return await this.sharedService.db
            .delete(users)
            .where(eq(users.id, id))
            .returning({ id: users.id });
    }

    public async markVerified(id: string) {
        return await this.sharedService.db
            .update(users)
            .set({ verified: true })
            .where(eq(users.id, id))
            .returning({ id: users.id });
    }
}
