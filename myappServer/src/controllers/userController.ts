import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response} from "express";



let arrAccount = [
    {
      userName: "tranducbo@gmail.com",
      password: "$2b$10$OAK02bgijjykNQHbhDtQh.pYgjzns/rISj6nFB31g2whH.KnUZuVS",
    },
    {
      userName: "ngobakha@gmail.com",
      password: "$2b$10$a0jsExZo/ES6wjXVehCevu9jbuXsM7l3vYcGXjJZ9Mjt9Myxb6zBa",
    },
  ];

const signUp = async (req:Request, res:Response) => {
    let userData = req.body;
    console.log("check",userData);
    
    let checkExist = false;
    if (userData) {
      arrAccount.map((item, index) => {
        if (item.userName === userData.userName) {
          checkExist = true;
        }
      });
      if (checkExist) {
        return res.status(200).json({
          errCode: 2,
          errMessage: "This account is already exist!",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(userData.password, salt);
        console.log("user password: ", hashPassword);
        arrAccount.push({ userName: userData.userName, password: hashPassword });
        console.log(" array account: ", arrAccount);
        return res.status(200).json({
          errCode: 0,
          errMessage: "Create new account success",
          userInfor: userData.userName,
        });
      }
    } else {
      return res.status(500).json({
        errCode: 1,
        errMessage: "Failed",
      });
    }
  };


  const userController = {
    signUp
}


export default userController