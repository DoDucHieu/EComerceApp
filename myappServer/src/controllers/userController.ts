import { Request, Response } from "express";
import User from "../models/user.model";

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const checkExist = await User.findOne({
      email: userData.email,
    });
    if (checkExist) {
      checkExist.fullName = userData.fullName;
      checkExist.gender = userData.gender;
      checkExist.age = userData.age;
      await checkExist.save();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Update user success",
      });
    } else {
      throw new Error("This user does't exist!");
    }
  } catch (e: any) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const userController = {
  updateUser,
};

export default userController;
