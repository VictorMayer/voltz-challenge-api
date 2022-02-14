import validateUser from '../validations/userValidation.js';
import * as userService from '../services/userService.js';

async function register(req, res, next) {
    try {
        validateUser(req.body);

        const result = await userService.createUser(req.body);

        return res.send(result);
    } catch (error) {
        if (error.name === 'UserError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

async function login(req, res, next) {
    try {
        validateUser(req.body); // to avoid unecessary DB acess
        return res.send();
    } catch (error) {
        if (error.name === 'UserError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

export {
    register,
    login,
};
