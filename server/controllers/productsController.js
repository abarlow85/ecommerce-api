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

  update(req, res, next) {
    const _id = req.params.id;
    const options = { runValidators: true, new: true, context: 'query' };
    Product.findOneAndUpdate({_id}, req.body, options)
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
      })
      .catch(err => res.status(404).send({}));
  }

  remove(req, res) {
    const _id = req.params.id;

    Product.findOneAndRemove({_id})
      .then(product => {
        if (!product) {
          return res.status(404).send({});
        }
        res.send(product);
      })
      .catch(err => res.status(404).send({}));
  }

}



module.exports = new ProductsController();
