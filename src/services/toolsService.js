import * as toolsRepository from '../repositories/toolsRepository.js';

async function createNewTool(tool) {
    return toolsRepository.saveTool(tool);
}

async function getToolsList() {
    return toolsRepository.getTools();
}

async function removeTool() {
    return toolsRepository.deleteTool();
}

export {
    createNewTool,
    getToolsList,
    removeTool,
};
