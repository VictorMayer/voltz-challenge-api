import connection from '../database.js';

async function saveTool(tool) {
    const { title, link, description, tags } = tool;

    return connection.query(`
        INSERT INTO
            tools (title, link, description, tags)
        VALUES
            ($1, $2, $3, $4)
        RETURNING *
    `, [title, link, description, tags]);
}

async function getTools() {
    return true;
}

async function deleteTool() {
    return true;
}

export {
    saveTool,
    getTools,
    deleteTool,
};
