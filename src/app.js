import express from 'express';
import cors from 'cors';

import * as toolsController from './controllers/toolsController.js';
import * as userController from './controllers/userController.js';

import serverError from './middlewares/serverError.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/check-status', (req, res) => {
    res.send('OK!');
});

app.post('/sign-up', userController.register);
app.post('/sign-in', userController.login);

app.post('/tools', toolsController.postNewTool);
app.get('/tools', toolsController.getToolsList);
app.delete('/tools/:id', toolsController.removeToolById);

app.use(serverError);

export default app;
