import * as authMw from '../middlewares/auth.mw.js';
import * as categoryController from '../controllers/category.controller.js';

export default (app) => {
  // create category
  app.post(
    '/ecomm/api/v1/categories',
    [authMw.verifyToken],
    categoryController.createNewCategory
  );
  //   get All Category
  app.get(
    '/ecomm/api/v1/categories/',
    [authMw.verifyToken],
    categoryController.getAllCategory
  );
  //   getcategoryById
  app.get(
    '/ecomm/api/v1/categories/:id/',
    [authMw.verifyToken],
    categoryController.getSpecificCategoryById
  );
  //edit Category
  app.put(
    '/ecomm/api/v1/categories/:id/',
    [authMw.verifyToken],
    categoryController.updateCategory
  );
  // Delete Category
  app.delete(
    '/ecomm/api/v1/categories/:id/',
    [authMw.verifyToken],
    categoryController.deletCategory
  );
};
