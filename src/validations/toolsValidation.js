import joi from 'joi';
import ToolError from '../errors/ToolError.js';

function specifyError(error) {
    switch (error) {
    case 'title': throw new ToolError('title is too short!', 400);
    case 'link': throw new ToolError('link is not a valid URL!', 400);
    case 'description': throw new ToolError('description is too short!', 400);
    case 'tags': throw new ToolError('must include at least one tag!', 400);
    default: break;
    }
}

export default function validateNewTool(tool) {
    const toolSchema = joi.object({
        title: joi.string().min(2).required(),
        link: joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:% \\+.~#?&//=]*)/).required(), // maybe the double escape char is bugging
        description: joi.string().min(10).required(),
        tags: joi.array().min(1).required(),
    });

    const { error } = toolSchema.validate(tool);

    if (error) specifyError(error.details[0].context.key);

    return true;
}
