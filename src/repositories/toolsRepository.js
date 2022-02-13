import connection from '../database.js';

async function saveTool(tool) {
    const { title, link, description, tags } = tool;

    const result = await connection.query(`
        INSERT INTO
            tools (title, link, description, tags)
        VALUES
            ($1, $2, $3, $4)
        RETURNING *
    `, [title, link, description, tags]);

    return result.rows[0];
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
