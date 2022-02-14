import connection from '../database.js';

async function checkUserByEmail(email) {
    const result = await connection.query('SELECT * FROM users WHERE email = $1', [email]);

    return result.rows[0];
}

async function saveUser({ email, password }) {
    const result = await connection.query(`
        INSERT INTO
            users (email, password)
        VALUES
            ($1, $2)
        RETURNING *
    `, [email, password]);

    return result.rows[0];
}

async function checkSession(id) {
    const result = await connection.query('SELECT * FROM sessions WHERE "userId" = $1', [id]);

    return result.rows[0];
}

async function createSession({ id, token }) {
    await connection.query('DELETE FROM sessions WHERE "userId" = $1', [id]);

    const result = await connection.query(`
        INSERT INTO
            sessions ("userId", token)
        VALUES
            ($1, $2)
        RETURNING *
    `, [id, token]);

    return result.rows[0];
}

export {
    checkUserByEmail,
    saveUser,
    checkSession,
    createSession,
};
