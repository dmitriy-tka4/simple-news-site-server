export function uploadFile(req, res, next) {
  let data = req.file;

  console.log(data);

  if (!data) {
    const error = new Error('Загрузить можно только изображение размером не более 1 Мб');
    return next(error);
  }

  res.status(201).json({
    fileUrl: `http://localhost:3000/uploads/${data.filename}`
  });
}
