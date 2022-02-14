import validateUser from '../validations/userValidation.js';
import * as userService from '../services/userService.js';

async function register(req, res, next) {
    try {
        validateUser(req.body);

        const result = await userService.createUser(req.body);

        return res.status(201).send(result);
    } catch (error) {
        if (error.name === 'UserError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

async function login(req, res, next) {
    try {
        validateUser(req.body); // to avoid unnecessary DB acess

        const result = await userService.checkLogin(req.body);

        return res.status(201).send({ token: result });
    } catch (error) {
        if (error.name === 'UserError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

export {
    register,
    login,
};
