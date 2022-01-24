import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import router from './router/authRouter.js';
import cors from 'cors';
import ErrorMiddleware from './middlewares/error-middlevare.js';

const PORT = process.env.PORT || config.get('port');

const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: config.get('clientUrl'),
}));

app.use('/', express.static('../client/build'));
app.use('/api', router);
app.get('*', (req, res) => {
  res.redirect('/');
});

app.use(ErrorMiddleware);

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