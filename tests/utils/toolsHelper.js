import connection from '../../src/database.js';

function endConnection() {
    return connection.end();
}

function cleanTools() {
    return connection.query('TRUNCATE tools CASCADE');
}

function cleanUsers() {
    return connection.query('TRUNCATE users CASCADE');
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
    cleanTools,
    cleanUsers,
    selectRandomToolProperty,
};
