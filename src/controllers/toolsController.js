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

async function getToolsList(req, res, next) {
    try {
        const { tag } = req.query;

        const result = await toolsService.getToolsList(tag);

        return res.send(result);
    } catch (error) {
        if (error.name === 'ToolError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

async function removeToolById(req, res, next) {
    try {
        const { id } = req.params;

        await toolsService.removeTool(id);

        return res.status(200).send({});
    } catch (error) {
        if (error.name === 'ToolError') return res.status(error.status).send(error.message);

        return next(error);
    }
}

export {
    postNewTool,
    getToolsList,
    removeToolById,
};
