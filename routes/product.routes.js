import * as productController from '../controllers/product.controller.js';
import * as authMw from '../middlewares/auth.mw.js';

export default (app) => {
  app.post(
    '/ecomm/api/v1/products',
    [authMw.verifyToken],
    productController.createNewProduct
  );

  app.get(
    '/ecomm/api/v1/products',
    [authMw.verifyToken],
    productController.getAllProduct
  );
  app.get(
    '/ecomm/api/v1/categories/:categoryId/products',
    [authMw.verifyToken],
    productController.productFindByCategoryId
  );
  app.put(
    '/ecomm/api/v1/products/:id',
    [authMw.verifyToken],
    productController.updateProductById
  );
  app.patch(
    '/ecomm/api/v1/products/:id',
    [authMw.verifyToken],
    productController.updateProductById
  );
  app.delete(
    '/ecomm/api/v1/products/:id',
    [authMw.verifyToken],
    productController.deleteProductById
  );
};
