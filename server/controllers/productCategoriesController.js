const {ProductCategory} = require('../db/models/productCategory');

class ProductCategoriesController {

  index(req, res) {
    ProductCategory.find({})
      .then(categories => {
        res.send(categories);
      })
      .catch(err => next(err));
  }

  create(req, res, next) {

    ProductCategory.create(req.body)
      .then(category => {
        res.send(category);
      }).catch(err => next(err));
  }

  update(req, res, next) {
    const _id = req.params.id;
    let { name, displayName } = req.body;
    const options = { runValidators: true, new: true, context: 'query' };
    ProductCategory.findOneAndUpdate({_id}, {name, displayName}, options)
      .then(category => {
        res.send(category);
      }).catch(err => next(err));
  }

  getOne(req, res) {

    const _id = req.params.id;

    ProductCategory.findById(_id)
      .then(category => {
        if (!category) {
          return res.status(404).send({});
        }
        res.send(category);
      })
      .catch(err => res.status(404).send({}));
  }

  remove(req, res) {
    const _id = req.params.id;

    ProductCategory.findOneAndRemove({_id})
      .then(category => {
        if (!category) {
          return res.status(404).send({});
        }
        res.send(category);
      })
      .catch(err => res.status(404).send({}));
  }

}



module.exports = new ProductCategoriesController();
