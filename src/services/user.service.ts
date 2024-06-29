import SharedServiceBase from '@/shared/shared-service';
import { repository } from '@/repository';

export class UserService {
    private sharedService: SharedServiceBase;
    private userRepository;

    constructor() {
        this.sharedService = new SharedServiceBase();
        this.userRepository = repository.userRepository;
    }

    async signUp(params: { email: string; password: string }) {
        // const userExists = await this.userRepository.findByEmail(params.email);

        // if (userExists) {
        //   throw new this.sharedService.httpException(
        //     409,
        //     "An user with this email already exists",
        //     "conflict"
        //   );
        // }

        return;
    }

    async signIn() {}
}
