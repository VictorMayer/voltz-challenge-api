import express from 'express';
import cors from 'cors';

import * as toolsController from './controllers/toolsController.js';
import * as userController from './controllers/userController.js';

import serverError from './middlewares/serverError.js';
import authorize from './middlewares/authMiddleware.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/check-status', (req, res) => {
    res.send('OK!');
});

app.post('/sign-up', userController.register);
app.post('/sign-in', userController.login);

app.post('/tools', authorize, toolsController.postNewTool);
app.get('/tools', authorize, toolsController.getToolsList);
app.delete('/tools/:id', authorize, toolsController.removeToolById);

app.use(serverError);

export default app;
