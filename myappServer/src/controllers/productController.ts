import e, { Request, Response } from "express";
import Product from "../models/product.model";

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await Product.find({});
    if (result) {
      return res.status(200).json({
        errCode: 0,
        errMessage: "Get all product success!",
        data: result,
      });
    } else {
      throw new Error("There are no product!");
    }
  } catch (e: any) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const createNewProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await Product.create({
      productName: productData.productName,
      price: productData.price,
    });
    return res.status(200).json({
      errCode: 0,
      errMessage: "Create new product success!",
      data: result,
    });
  } catch (e: any) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const productController = {
  getAllProduct,
  createNewProduct,
};

export default productController;
