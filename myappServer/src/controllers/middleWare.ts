import config from "config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header("Authorization");
  const token = header && header.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const secret = config.get<string>("ACCESS_TOKEN_SECRET");
    let decode = jwt.verify(token, secret);
    console.log("Decode: ", decode);
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

let middleWare = {
  verifyToken,
};

export default middleWare;
