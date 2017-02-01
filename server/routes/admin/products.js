const ProductsController = require('../../controllers/productsController');

module.exports = (router) => {
  router.route('/products')
    .get(ProductsController.index)
    .post(ProductsController.create);

  router.route('/products/:id')
    .get(ProductsController.getOne);
};
