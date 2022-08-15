import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import indexRoute from './routes/index.route.js';
import articleRoute from './routes/article.route.js';
import uploadRoute from './routes/upload.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, 'static', 'uploads'));
  },
  filename: function (req, file, cb) {
    const fileName = uuidv4();
    cb(null, `${fileName}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image/')) {
    cb(null, true); // принять файл
  } else {
    cb(null, false); // отклонить файл
  }
};

app.use(multer({
  storage: storage,
  limits: { fileSize: '1048576' }, // default bytes = 1 Mb // - не работает, баг библиотеки
  fileFilter: fileFilter
}).single('file'));

// base routes
app.use('/', indexRoute);
app.use('/articles', articleRoute);
app.use('/upload', uploadRoute);

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
  console.log(err);
  res.status(err.status || 500).send(err.message);
});

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/news-site');

  app.listen(port, () => {
    console.log(`Server is running, listening at http://localhost:${port}`);
  })
};

main();
