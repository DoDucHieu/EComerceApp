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

const generateToken = (payload: any) => {
  const secretAccessToken = config.get<string>("ACCESS_TOKEN_SECRET");
  const secretRefreshToken = config.get<string>("REFRESH_TOKEN_SECRET");
  const accessToken = jwt.sign(payload, secretAccessToken, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign(payload, secretRefreshToken, {
    expiresIn: "30m",
  });
  return { accessToken, refreshToken };
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
        let { accessToken, refreshToken } = generateToken(userData);
        return res.status(200).json({
          errCode: 0,
          errMessage: "Login success",
          email: userData.email,
          accessToken,
          refreshToken,
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

const logout = async (req: Request, res: Response) => {
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
  logout,
};

export default authController;
