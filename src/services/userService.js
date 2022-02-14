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

async function upsertSession(id) {
    let session = await userRepository.checkSession(id);

    if (session) return session.token;

    session = await userRepository.createSession({ id, token: uuid() });

    return session.token;
}

async function checkLogin(user) {
    const { email, password } = user;

    const result = await userRepository.checkUserByEmail(email);

    if (result && bcrypt.compareSync(password, result.password)) return upsertSession(result.id);

    throw new UserError('Email and/or password are invalid!', 401);
}

export {
    createUser,
    checkLogin,
};
