import express from 'express';
import mongoose from 'mongoose';
import indexRoute from './routes/index.route.js'
import articleRoute from './routes/article.route.js'

const app = express();
const port = 3000;

app.use(express.json());

app.use('/', indexRoute);
app.use('/articles', articleRoute);

// 404
app.use((req, res, next) => {
  // можно не пробрасывать ошибку, а сразу посылать статус
  // res.sendStatus(404);

  const error = new Error('Not Found');
  error.status = 404;

  next(error);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/news-site');

  app.listen(port, () => {
    console.log(`Server is running, listening at http://localhost:${port}`);
  })
};

main();
