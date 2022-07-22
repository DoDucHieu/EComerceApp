import { Request, Response, NextFunction } from "express";
import UserProduct from "../models/userProduct.model";

const getAllCartByUserEmail = async (req: Request, res: Response) => {
  try {
    const userEmail = req.query.email;

    const result = await UserProduct.find(
      { email: userEmail },
      { createdAt: 0, updatedAt: 0, email: 0, _id: 0 }
    ).populate("productId", { createdAt: 0, updatedAt: 0 });
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

// const addToCart = async (req: Request, res: Response) => {
//   try {
//     const userProductData = req.body;
//     const result = await UserProduct.create({
//       email: userProductData.email,
//       productId: userProductData.productId,
//       quantity: userProductData.quantity,
//     });
//     return res.status(200).json({
//       errCode: 0,
//       errMessage: "Add to cart success!",
//       data: result,
//     });
//   } catch (e: any) {
//     return res.status(500).json({
//       errCode: 1,
//       errMessage: e.message,
//     });
//   }
// };

const AddOrUpdateCart = async (req: Request, res: Response) => {
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
    } else {
      const rs = await UserProduct.create({
        email: userProductData.email,
        productId: userProductData.productId,
        quantity: userProductData.quantity,
      });
      return res.status(200).json({
        errCode: 0,
        errMessage: "Add to cart success!",
        data: rs,
      });
    }
  } catch (e: any) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userProductData = req.body;
    const result = await UserProduct.findOneAndDelete({
      email: userProductData.email,
      productId: userProductData.productId,
    });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Delete from cart success!",
      data: result,
    });
  } catch (e: any) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const userProductController = {
  getAllCartByUserEmail,
  AddOrUpdateCart,
  removeFromCart,
};
export default userProductController;
