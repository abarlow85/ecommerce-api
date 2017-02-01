const Product = require('../db/models/product');

class ProductsController {

  index(req, res) {
    Product.find({})
      .then(products => {
        res.send(products);
      })
      .catch(err => next(err));
  }

  create(req, res, next) {

    Product.create(req.body)
      .then(product => {
        res.send(product);
      }).catch(err => next(err));
  }

  getOne(req, res) {

    const _id = req.params.id;

    Product.findById(_id)
      .then(product => {
        if (!product) {
          return res.status(404).send({});
        }
        res.send(product);
      });
  }

}



module.exports = new ProductsController();
