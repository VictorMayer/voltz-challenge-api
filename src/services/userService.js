import UserError from '../errors/UserError.js';
import * as userRepository from '../repositories/userRepository.js';

async function createUser(user) {
    const { email, password } = user;

    const existentEmail = await userRepository.checkUserByEmail(email);

    if (existentEmail) throw new UserError('Email already exists!', 409);

    return userRepository.saveUser({ email, password });
}

async function createSession() {
    return true;
}

export {
    createUser,
    createSession,
};
