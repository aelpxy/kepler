import SharedServiceBase from '@/shared/shared-service';

class UserRepository {
    private sharedService: SharedServiceBase;

    constructor() {
        this.sharedService = new SharedServiceBase();
    }

    public async findById(id: string) {
        return await this.sharedService.db.user.findUnique({
            where: { id },
        });
    }

    public async findByEmail(email: string) {
        return await this.sharedService.db.user.findUnique({
            where: { email },
        });
    }
}

export { UserRepository };
