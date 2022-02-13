import validateNewTool from '../validations/toolsValidation.js';

import * as toolsService from '../services/toolsService.js';

async function postNewTool(req, res, next) {
    try {
        validateNewTool(req.body);

        const result = await toolsService.createNewTool(req.body);

        return res.status(201).send(result);
    } catch (error) {
        if (error.name === 'ToolError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

async function getToolsList(req, res) {
    return res.send();
}

async function removeToolById(req, res) {
    return res.send();
}

export {
    postNewTool,
    getToolsList,
    removeToolById,
};
