

import * as authMw from "../middlewares/auth.mw.js";
import * as categoryController from "../controllers/category.controller.js";

export default (app) => {
    app.post("/ecomm/api/v1/categories", [authMw.verifyToken,], categoryController.createNewCategory);
};