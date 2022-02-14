import connection from '../database.js';
import ToolError from '../errors/ToolError.js';

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
    const result = await connection.query('SELECT * FROM tools');

    return result.rows;
}

async function getToolsByTag(tag) {
    const result = await connection.query('SELECT * FROM tools WHERE $1 = ANY (tags)', [tag]);

    if (!result.rows.length) throw new ToolError(`No tools tagged with ${tag} were found!`, 404);

    return result.rows;
}

async function getToolByTitleOrLink({ title, link }) {
    const result = await connection.query('SELECT * FROM tools WHERE title = $1 OR link = $2', [title, link]);

    return result.rows[0];
}

async function deleteTool(id) {
    return connection.query('DELETE FROM tools WHERE id = $1', [id]);
}

export {
    saveTool,
    getTools,
    deleteTool,
    getToolsByTag,
    getToolByTitleOrLink,
};
