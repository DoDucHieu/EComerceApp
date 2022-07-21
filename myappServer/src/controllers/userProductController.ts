import { Request, Response, NextFunction } from "express";
import UserProduct from "../models/userProduct.model";

const getAllCartByUserEmail = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email;
    console.log("check :", req.query);

    const result = await UserProduct.find({ email: userEmail });
    console.log("res: ", result);
    return res.status(200).json({
      errCode: 0,
      errMessage: "Get all cart success!",
      data: result,
    });
  } catch (e: any) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const addToCart = async (req: Request, res: Response) => {
  try {
    const userProductData = req.body;
    const result = await UserProduct.create({
      email: userProductData.email,
      productId: userProductData.productId,
      quantity: userProductData.quantity,
    });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Add to cart success!",
      data: result,
    });
  } catch (e: any) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const updateCart = async (req: Request, res: Response) => {
  try {
    const userProductData = req.body;
    const result = await UserProduct.findOne({
      email: userProductData.email,
      productId: userProductData.productId,
    });
    if (result) {
      result.quantity =
        Number(result.quantity) + Number(userProductData.quantity);
      await result.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Update cart success!",
        data: result,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const userProductController = {
  getAllCartByUserEmail,
  addToCart,
  updateCart,
};
export default userProductController;
