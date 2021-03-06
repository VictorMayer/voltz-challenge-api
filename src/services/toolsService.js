import ToolError from '../errors/ToolError.js';
import * as toolsRepository from '../repositories/toolsRepository.js';

async function createNewTool(tool) {
    const { title, link } = tool;

    const existentTool = await toolsRepository.getToolByTitleOrLink({ title, link });

    if (existentTool) throw new ToolError(`${existentTool.title} already exists`, 409);

    return toolsRepository.saveTool(tool);
}

async function getToolsList(tag) {
    let result;

    if (!tag) result = await toolsRepository.getTools();
    else result = await toolsRepository.getToolsByTag(tag);

    if (!result.length) throw new ToolError('No tools have been registered yet!', 404);

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
