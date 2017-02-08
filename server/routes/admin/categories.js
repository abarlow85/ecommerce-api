const CategoriesController = require('../../controllers/productCategoriesController');

module.exports = (router) => {
  router.route('/categories')
    .get(CategoriesController.index)
    .post(CategoriesController.create);

  router.route('/categories/:id')
    .get(CategoriesController.getOne)
    .put(CategoriesController.update)
    .delete(CategoriesController.remove);
};
