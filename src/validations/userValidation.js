import joi from 'joi';
import UserError from '../errors/UserError.js';

function specifyError(error) {
    switch (error) {
    case 'email': throw new UserError('email is not valid!', 400);
    case 'password': throw new UserError('password is too short!', 400);
    default: break;
    }
}

export default function validateUser(tool) {
    const toolSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
    });

    const { error } = toolSchema.validate(tool);

    if (error) specifyError(error.details[0].context.key);

    return true;
}
