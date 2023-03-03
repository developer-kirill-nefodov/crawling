export const getPageProgressMiddleware = (req, res, next) => {
  const {secret} = req.params;

  if(!secret) {
    res.status(400).send('not found secret ket');
  } else {
    next();
  }
}
