import joi from 'joi';

function specifyError(error) {
    switch (error) {
    case 'title': throw new Error();
    case 'link': throw new Error();
    case 'description': throw new Error();
    case 'tags': throw new Error();
    default: break;
    }
}

export default function validateNewTool(tool) {
    const toolSchema = joi.object({
        title: joi.string().min(2).required(),
        link: joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:% \\+.~#?&//=]*)/).required(), // maybe the double escape char is bugging
        description: joi.string().min(10).required(),
        tags: joi.array.length(1).required(),
    });

    const { error } = toolSchema.validate(tool);

    if (error) specifyError(error.details[0].context.key);

    return true;
}
