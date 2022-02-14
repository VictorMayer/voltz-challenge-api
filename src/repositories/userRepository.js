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

export {
    checkUserByEmail,
    saveUser,
};
