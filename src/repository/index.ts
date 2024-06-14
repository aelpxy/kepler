import { UserRepository } from './user.repository';

const userRepository = new UserRepository();

export const repository = {
    userRepository,
};
