import Article from '../models/article.model.js';

// получение всех
export async function getAllArticles(req, res, next) {
  try {
    const articles = await Article.find();
    console.log(articles);

    res.json(articles);
  } catch (e) {
    // res.status(500).json(e);
    next(e);
  }
}

// поиск одной по id
export async function getById(req, res, next) {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    // если не нашел ничего (будет null), нужно возвращать error 404
    if (!article) {
      const error = new Error('Not Found');
      error.status = 404;

      next(error);
    } else {
      res.json(article);
    }
  } catch (e) {
    next(e);
  }
}

// создание
export async function createArticle(req, res, next) {
  const { title, content } = req.body;

  const article = new Article({ title, content });

  // TODO: как обрабатывать, если обязательные поля не все пришли
  // в catch ниже ошибку поймает и покажет
  console.log('content', content);

  try {
    const createdArticle = await article.save();

    // headers
    res.location(`/articles/${createdArticle._id}`);

    res.sendStatus(201);
  } catch (e) {
    e.status = 400; // or 422

    next(e);
  }
}

// put - обновление
export async function updateArticle(req, res, next) {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    const error = new Error('Title and content are required');
    error.status = 400;

    return next (error);
  }

  try {
    await Article.findOneAndUpdate({ _id: id }, { title, content });

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

// delete - удаление
export async function deleteArticle(req, res, next) {
  const { id } = req.params;

  try {
    await Article.deleteOne({ _id: id });

    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
}

// patch - частичное обновление
export async function patchArticle(req, res, next) {
  // 405 (Method Not Allowed)
  // res.sendStatus(405);

  // или
  const error = new Error('Method Not Allowed');
  error.status = 405;

  next(error);
}
