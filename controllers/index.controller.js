export function getMain(req, res) {
  let message = {
    isMain: true,
    text: 'Hi, this is main page'
  };

  res.json(message);
}
