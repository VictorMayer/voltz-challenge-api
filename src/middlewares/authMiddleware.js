import connection from '../database.js';

export default async function authorize(req, res, next) {
    try {
        const token = req.headers.authorization?.split('Bearer ')[1];
        const result = await connection.query('SELECT * FROM sessions WHERE token = $1', [token]);
        if (!result.rows.length) return res.sendStatus(401);
        return next();
    } catch (error) {
        if (error.name === 'UserError') return res.status(error.status).send(error.message);

        return res.send(error.message);
    }
}
