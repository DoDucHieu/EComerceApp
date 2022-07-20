import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "config";

import { Request, Response } from "express";
import User from "../models/user.model";

const signUp = async (req: Request, res: Response) => {
  try {
    let userData = req.body;
    const checkExist = await User.findOne({ email: userData.email });
    if (checkExist) {
      throw new Error("This email is already exists!");
    } else {
      const salt = await bcrypt.genSalt(10);
      let hashPassword = await bcrypt.hash(userData.password, salt);
      const result = await User.create({
        email: userData.email,
        password: hashPassword,
      });
      return res.status(200).json({
        errCode: 0,
        errMessage: "Create new account success",
        userInfor: result,
      });
    }
  } catch (e: any) {
    return res.status(200).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const checkExist = await User.findOne({
      email: userData.email,
    });
    if (checkExist) {
      const compare = await comparePassword(
        userData.password,
        checkExist.password
      );
      if (compare) {
        const secret = config.get<string>("ACCESS_TOKEN_SECRET");
        let accessToken = jwt.sign(userData, secret);
        return res.status(200).json({
          errCode: 0,
          errMessage: "Login success",
          email: userData.email,
          accessToken,
        });
      } else {
        throw new Error("Password incorrect!");
      }
    } else {
      throw new Error("Email incorrect!");
    }
  } catch (e: any) {
    return res.status(500).json({
      errCode: 1,
      errMessage: e.message,
    });
  }
};

const comparePassword = async (
  clientPassword: string,
  serverPassword: string
) => {
  try {
    let validPassword = await bcrypt.compare(clientPassword, serverPassword);
    return validPassword;
  } catch (e) {
    console.log(e);
  }
};

const authController = {
  signUp,
  login,
};

export default authController;
