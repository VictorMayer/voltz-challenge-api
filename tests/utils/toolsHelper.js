import connection from '../../src/database.js';

function endConnection() {
    return connection.end();
}

async function cleanDB() {
    await connection.query('TRUNCATE tools RESTART IDENTITY');
    await connection.query('TRUNCATE sessions RESTART IDENTITY');
    await connection.query('TRUNCATE users RESTART IDENTITY');
}

function selectRandomToolProperty() {
    const random = Math.ceil(Math.random() * 4);

    switch (random) {
    case 1: return 'title';
    case 2: return 'link';
    case 3: return 'description';
    case 4: return 'tags';
    default: return undefined;
    }
}

export {
    endConnection,
    cleanDB,
    selectRandomToolProperty,
};
