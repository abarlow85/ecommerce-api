const errorHandler = (err, req, res, next) => {
  try {
    const errors = {};
    Object.keys(err.errors).forEach(error => {
      errors[error] = err.errors[error].message;
      // console.log(error);
    });

    res.status(422).send({errors});
  } catch (e) {
    res.status(422).send(err);
  } finally {
    next();
  }

  next();
};

module.exports = errorHandler;
