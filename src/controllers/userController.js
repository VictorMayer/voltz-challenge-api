import validateNewUser from '../validations/userValidation.js';
import * as userService from '../services/userService.js';

async function register(req, res, next) {
    try {
        validateNewUser(req.body);

        const result = await userService.createUser(req.body);

        return res.send(result);
    } catch (error) {
        if (error.name === 'UserError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

async function login(req, res) {
    return res.send();
}

export {
    register,
    login,
};
