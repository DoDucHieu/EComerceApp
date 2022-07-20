import { Schema } from "mongoose";
import mongoose from "mongoose";

interface Product {
  productName: string;
  price: number;
}

const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
