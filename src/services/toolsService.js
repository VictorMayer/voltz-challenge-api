import ToolError from '../errors/ToolError.js';
import * as toolsRepository from '../repositories/toolsRepository.js';

async function createNewTool(tool) {
    return toolsRepository.saveTool(tool);
}

async function getToolsList() {
    const result = await toolsRepository.getTools();

    if (!result.length) throw new ToolError('No tools have been registered', 200);

    return result;
}

async function removeTool() {
    return toolsRepository.deleteTool();
}

export {
    createNewTool,
    getToolsList,
    removeTool,
};
