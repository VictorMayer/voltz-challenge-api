import bcrypt from 'bcrypt';
import UserError from '../errors/UserError.js';
import * as userRepository from '../repositories/userRepository.js';

async function createUser(user) {
    const { email, password } = user;

    const existentEmail = await userRepository.checkUserByEmail(email);

    if (existentEmail) throw new UserError('Email already exists!', 409);

    const hashedPassword = bcrypt.hashSync(password, 10);

    const body = { email, password: hashedPassword };

    return userRepository.saveUser(body);
}

async function createSession() {
    return true;
}

export {
    createUser,
    createSession,
};
