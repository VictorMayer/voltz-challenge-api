import ToolError from '../errors/ToolError.js';
import * as toolsRepository from '../repositories/toolsRepository.js';

async function createNewTool(tool) {
    return toolsRepository.saveTool(tool);
}

async function getToolsList() {
    const result = await toolsRepository.getTools();

    if (!result.length) throw new ToolError('No tools have been registered!', 200);

    return result;
}

async function removeTool(id) {
    if (Number.isNaN(Number(id))) throw new ToolError('ID must be a number!', 400);

    return toolsRepository.deleteTool(id);
}

export {
    createNewTool,
    getToolsList,
    removeTool,
};
