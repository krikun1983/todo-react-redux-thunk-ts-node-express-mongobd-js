import express from 'express';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use('/', express.static('../client/build'));

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();