/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';

import mockToolFactory from '../factories/toolFactory.js';
import { cleanTools, endConnection, selectRandomToolProperty } from '../utils/toolsHelper.js';

afterAll(async () => {
    await endConnection();
});

describe('POST /tools', () => {
    beforeEach(async () => {
        await cleanTools();
    });

    it('returns 201 for created tool with valid body', async () => {
        const body = mockToolFactory();

        const result = await supertest(app)
            .post('/tools')
            .send(body);
        expect(result.status).toEqual(201);
    });

    it('returns 409 if new tool already exists', async () => {
        const body = mockToolFactory();

        await supertest(app).post('/tools').send(body);

        const result = await supertest(app)
            .post('/tools')
            .send(body);
        expect(result.status).toEqual(409);
    });

    it('returns 400 for body missing data', async () => {
        const body = mockToolFactory();

        const property = selectRandomToolProperty();

        delete body[property];

        const result = await supertest(app)
            .post('/tools')
            .send(body);
        expect(result.status).toEqual(400);
    });
});
