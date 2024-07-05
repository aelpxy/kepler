import SharedServiceBase from '@/shared/shared-service';
import { repository } from '@/repository';

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

        // copying an object with `...` does introduce some memory overhead but it's fine
        const user = await repository.userRepository.create({
            avatarPath: 'avatar_path',
            ...params,
        });

        return user;
    }

    async signIn() {}
}
