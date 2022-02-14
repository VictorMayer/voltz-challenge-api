/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import app from '../../src/app.js';

import mockToolFactory from '../factories/toolFactory.js';
import mockTokenFactory from '../factories/sessionFactory.js';
import { cleanDB, endConnection, selectRandomToolProperty } from '../utils/toolsHelper.js';

afterAll(async () => {
    await cleanDB();
    await endConnection();
});

describe('POST /tools', () => {
    beforeEach(async () => {
        await cleanDB();
    });

    it('returns 201 for created tool with valid body', async () => {
        const token = await mockTokenFactory();

        const body = mockToolFactory();

        const result = await supertest(app)
            .post('/tools')
            .set('Authorization', `Bearer ${token}`)
            .send(body);
        expect(result.status).toEqual(201);
    });

    it('returns 401 for missing token', async () => {
        const body = mockToolFactory();

        const result = await supertest(app)
            .post('/tools')
            .send(body);
        expect(result.status).toEqual(401);
    });

    it('returns 409 if new tool already exists', async () => {
        const token = await mockTokenFactory();

        const body = mockToolFactory();

        await supertest(app).post('/tools').set('Authorization', `Bearer ${token}`).send(body);

        const result = await supertest(app)
            .post('/tools')
            .set('Authorization', `Bearer ${token}`)
            .send(body);
        expect(result.status).toEqual(409);
    });

    it('returns 400 for body missing data', async () => {
        const token = await mockTokenFactory();

        const body = mockToolFactory();

        const property = selectRandomToolProperty();

        delete body[property];

        const result = await supertest(app)
            .post('/tools')
            .set('Authorization', `Bearer ${token}`)
            .send(body);
        expect(result.status).toEqual(400);
    });
});

describe('GET /tools', () => {
    beforeEach(async () => {
        await cleanDB();
    });

    it('returns 200 for listing all tools', async () => {
        const token = await mockTokenFactory();

        const tool1 = mockToolFactory();
        const tool2 = mockToolFactory();

        await supertest(app).post('/tools').set('Authorization', `Bearer ${token}`).send(tool1);
        await supertest(app).post('/tools').set('Authorization', `Bearer ${token}`).send(tool2);

        const result = await supertest(app)
            .get('/tools')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
        expect(result.body.length).toEqual(2);
    });

    it('returns 200 for listing tools with given tag passed as query string', async () => {
        const token = await mockTokenFactory();

        const tool1 = mockToolFactory();
        const tool2 = mockToolFactory();

        await supertest(app).post('/tools').set('Authorization', `Bearer ${token}`).send(tool1);
        await supertest(app).post('/tools').set('Authorization', `Bearer ${token}`).send(tool2);

        const result = await supertest(app)
            .get('/tools')
            .query({ tag: tool1.tags[0] })
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
        expect(result.body.length).toEqual(1);
    });

    it('returns 404 if no tool found', async () => {
        const token = await mockTokenFactory();

        const result = await supertest(app)
            .get('/tools')
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(404);
    });

    it('returns 404 if no tool with given tag could be found', async () => {
        const token = await mockTokenFactory();

        const tool = mockToolFactory();

        await supertest(app).post('/tools').set('Authorization', `Bearer ${token}`).send(tool);

        const result = await supertest(app)
            .get('/tools')
            .query({ tag: 'myOwnCustomTagThatFakerWontEverGenerate' })
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(404);
    });
});

describe('DELETE /tools/:id', () => {
    beforeEach(async () => {
        await cleanDB();
    });

    it('returns 200 deleted tool', async () => {
        const token = await mockTokenFactory();

        const mockTool = mockToolFactory();

        const createdTool = await supertest(app).post('/tools').set('Authorization', `Bearer ${token}`).send(mockTool);

        const { id } = createdTool.body;

        const result = await supertest(app)
            .delete(`/tools/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(result.status).toEqual(200);
    });

    it('returns 401 for trying to delete tool without token', async () => {
        const token = await mockTokenFactory();

        const mockTool = mockToolFactory();

        const createdTool = await supertest(app).post('/tools').set('Authorization', `Bearer ${token}`).send(mockTool);

        const { id } = createdTool.body;

        const result = await supertest(app)
            .delete(`/tools/${id}`);
        expect(result.status).toEqual(401);
    });
});
