import { Express } from "express";
import middleWare from "../controllers/middleWare";

import userController from "../controllers/userController";
import productController from "../controllers/productController";
import authController from "../controllers/authController";
import userProductController from "../controllers/userProductController";

let routes = (app: Express) => {
  app.get("/", (req, res) => res.send("hello world"));

  //auth
  app.post("/sign-up", authController.signUp);
  app.post("/login", authController.login);

  //user
  app.put("/update-user", userController.updateUser);

  //product
  app.get("/get-all-product", productController.getAllProduct);
  app.post("/create-new-product", productController.createNewProduct);

  //cart
  app.post("/add-to-cart", userProductController.addToCart);
  app.post("/update-cart", userProductController.updateCart);
};

export default routes;
