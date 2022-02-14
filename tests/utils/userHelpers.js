import connection from '../../src/database.js';

function endConnection() {
    return connection.end();
}

async function cleanDB() {
    await connection.query('TRUNCATE users RESTART IDENTITY');
}

function selectRandomUserProperty() {
    const random = Math.ceil(Math.random() * 2);

    switch (random) {
    case 1: return 'email';
    case 2: return 'password';
    default: return undefined;
    }
}

export {
    endConnection,
    cleanDB,
    selectRandomUserProperty,
};
