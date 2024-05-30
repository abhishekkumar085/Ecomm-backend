


import authController from "../controllers/auth.controller.js";

import * as authMW from "../middlewares/auth.mw.js";

export default (app) => {
    app.post("/ecomm/api/v1/auth/signup", [authMW.verifySignUpBody], authController.signup);
    app.post("/ecomm/api/v1/auth/signin", [authMW.verifySignInBody], authController.signin);
};