import express from 'express';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: '10mb',
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '10mb',
  })
);

//to store images and files in public
app.use(express.static('public'));

import userRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
export default app;
