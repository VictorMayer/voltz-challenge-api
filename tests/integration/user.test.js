/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';

import { mockUserFactory, mockUserPassword } from '../factories/userFactory.js';
import { cleanDB, endConnection, selectRandomUserProperty } from '../utils/userHelpers.js';

afterAll(async () => {
    await cleanDB();
    await endConnection();
});

describe('POST /users/sign-up', () => {
    beforeEach(async () => {
        await cleanDB();
    });

    it('returns 201 for created user with valid body', async () => {
        const body = mockUserFactory();

        const result = await supertest(app)
            .post('/users/sign-up')
            .send(body);
        expect(result.status).toEqual(201);
    });

    it('returns 409 if new user already exists', async () => {
        const body = mockUserFactory();

        await supertest(app).post('/users/sign-up').send(body);

        const result = await supertest(app)
            .post('/users/sign-up')
            .send(body);
        expect(result.status).toEqual(409);
    });

    it('returns 400 for body missing data', async () => {
        const body = mockUserFactory();

        const property = selectRandomUserProperty();

        delete body[property];

        const result = await supertest(app)
            .post('/users/sign-up')
            .send(body);
        expect(result.status).toEqual(400);
    });
});

describe('POST /users/sign-in', () => {
    beforeEach(async () => {
        await cleanDB();
    });

    it('returns 201 for loggin with valid user and created session', async () => {
        const body = mockUserFactory();

        await supertest(app).post('/users/sign-up').send(body);

        const result = await supertest(app)
            .post('/users/sign-in')
            .send(body);
        expect(result.status).toEqual(201);
    });

    it('returns 401 for wrong email and/or password', async () => {
        const userRegister = mockUserFactory();

        await supertest(app).post('/users/sign-up').send(userRegister);

        const userLogin = mockUserFactory();

        const result = await supertest(app)
            .post('/users/sign-in')
            .send(userLogin);
        expect(result.status).toEqual(401);
    });

    it('returns 401 for correct email and wrong password', async () => {
        const userRegister = mockUserFactory();

        await supertest(app).post('/users/sign-up').send(userRegister);

        const userLogin = {
            email: userRegister.email,
            password: mockUserPassword(),
        };

        const result = await supertest(app)
            .post('/users/sign-in')
            .send(userLogin);
        expect(result.status).toEqual(401);
    });

    it('returns 400 for body missing data', async () => {
        const body = mockUserFactory();

        const property = selectRandomUserProperty();

        delete body[property];

        const result = await supertest(app)
            .post('/users/sign-in')
            .send(body);
        expect(result.status).toEqual(400);
    });
});
