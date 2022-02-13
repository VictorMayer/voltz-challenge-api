import express from 'express';
import cors from 'cors';

import * as toolsController from './controllers/toolsController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/check-status', (req, res) => {
    res.send('OK!');
});

app.post('/tools', toolsController.postNewTool);

export default app;
