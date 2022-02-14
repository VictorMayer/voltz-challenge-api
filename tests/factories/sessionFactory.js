import faker from 'faker-br';
import connection from '../../src/database.js';

export default async function mockTokenFactory() {
    const token = faker.random.uuid();
    const result = await connection.query(`
        INSERT INTO
            sessions ("userId", token)
        VALUES
            ($1, $2)
        RETURNING *
    `, [1, token]);

    return result.rows[0].token;
}
