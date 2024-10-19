import { repository } from '@/repository';
import SharedServiceBase from '@/shared/shared-service';

import { HttpException } from '@/utils/http';

export class UserService {
    private sharedService: SharedServiceBase;
    private userRepository;

    constructor() {
        this.sharedService = new SharedServiceBase();
        this.userRepository = repository.userRepository;
    }

    async signUp(params: { email: string; username: string }) {
        const userExists = await this.userRepository.findByEmail(params.email);

        if (userExists) {
            throw new HttpException(
                409,
                `No user found with email '${params.email}'.`,
                'conflict'
            );
        }

        const user = await repository.userRepository.create({
            avatarPath: 'avatar_path',
            ...params,
        });

        return user;
    }

    async signIn() {}
}
