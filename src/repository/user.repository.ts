import SharedServiceBase from '@/shared/shared-service';
import { users } from '@/db/schema';

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
            .returning();
    }
}
