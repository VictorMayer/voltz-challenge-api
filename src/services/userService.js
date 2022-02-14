import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
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

async function checkLogin(user) {
    const { email, password } = user;

    const result = await userRepository.checkUserByEmail(email);

    if (!result || !bcrypt.compareSync(password, result.password)) throw new UserError('Email and/or password are invalid!', 401);

    let session = await userRepository.checkSession(result.id);

    if (!session?.lenght) session = await userRepository.createSession({ id: result.id, token: uuid() });

    return session.token;
}

export {
    createUser,
    checkLogin,
};
