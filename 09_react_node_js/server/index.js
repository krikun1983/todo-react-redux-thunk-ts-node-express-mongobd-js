import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import router from './router/authRouter.js';

const PORT = process.env.PORT || config.get('port');

const app = express();

app.use(express.json());
app.use('/', express.static('../client/build'));
app.use('/api', router);

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