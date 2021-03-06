const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
    request.test = 'hello';
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'CastError') {
    return response.status(404).json({ error: error.message });
  }
  return next(error);
};

module.exports = {
  tokenExtractor,
  errorHandler,
};
