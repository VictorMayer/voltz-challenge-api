class ToolError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ToolError';
        this.status = status;
    }
}

export default ToolError;
