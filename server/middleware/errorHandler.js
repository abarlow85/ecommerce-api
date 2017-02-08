const errorHandler = (err, req, res, next) => {
  const errors = {};
  try {
    Object.keys(err.errors).forEach(error => {
      errors[error] = err.errors[error].message;
      // console.log(error);
    });

    res.status(422).send({errors});

  } catch (e) {
    if (err.path) {
      errors[err.path] = `${err.path} entered is invalid (numbers or . only)`;
      return res.status(422).send({errors});
    }

    res.status(422).send(err);

  } finally {
    next();
  }

  // next();
};

module.exports = errorHandler;
