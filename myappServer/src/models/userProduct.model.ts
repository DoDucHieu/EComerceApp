import { Schema } from "mongoose";
import mongoose from "mongoose";

interface UserProduct {
  email: string;
  productId: string;
  quantity: number;
}

const userProductSchema = new Schema(
  {
    email: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserPruduct", userProductSchema);
