export const postPagesSearchMiddleware = (req, res, next) => {
  const {urls, keywords} = req.body;

  if(
    !urls.every(e => typeof e === 'string' && e.includes('https://')) ||
    !keywords.every(e => typeof e === 'string' && e.length > 3)
  ) {
    res.status(400).send('data not valid');
  } else {
    next();
  }
}
