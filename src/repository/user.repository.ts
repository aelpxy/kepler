import SharedServiceBase from '@/shared/shared-service';

import { getUserRepositorySchema } from '@/schemas/user.schema';
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

        if (!user) {
            throw new this.sharedService.httpException(
                404,
                `No user found with ID '${id}'.`,
                'resource_missing'
            );
        }

        return getUserRepositorySchema.parse(user);
    }

    public async findByEmail(email: string) {
        const user = await this.sharedService.db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (!user) {
            throw new this.sharedService.httpException(
                404,
                `No user found with email '${email}'.`,
                'resource_missing'
            );
        }

        return getUserRepositorySchema.parse(user);
    }
}
