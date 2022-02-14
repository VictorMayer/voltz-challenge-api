import express from 'express';
import cors from 'cors';

import router from './routers/routerIndex';

import serverError from './middlewares/serverError.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/check-status', (req, res) => {
    res.send('OK!');
});

app.use(router);

app.use(serverError);

export default app;
