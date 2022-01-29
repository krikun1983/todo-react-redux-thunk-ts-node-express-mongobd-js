import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import cors from 'cors';
import { errorMiddleware } from './middlewares/index.js';
import { authorizationRouter, categoriesRouter, tasksRouter } from './routers/index.js';
import * as Path from 'path';

const PORT = process.env.PORT || config.get('port');

const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: config.get('clientUrl'),
}));

app.use('/', express.static('../client/build'));

app.use('/categories/:id', express.static('../client/build'));

app.use('/api', authorizationRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/tasks', tasksRouter);

app.use('*', express.static('../client/build'));

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(config.get('DB_URL'), { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();