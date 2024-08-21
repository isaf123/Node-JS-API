import { Request, Response } from "express";
import { handleResponse } from "../middleware/handleResponse";
import { sign } from "jsonwebtoken";
import { utilsResponse } from "../utils";
import db from "../config/db";
import dotenv from "dotenv";
dotenv.config();
export const registrationUsers = (req: Request, res: Response) => {
  const { email, first_name, last_name, password } = req.body;
  let query = `insert into users (
  email,
  first_name,
  last_name,
  password) 
  values ('${email}','${first_name}','${last_name}','${password}')`;

  return handleResponse(query, res, "Registrasi berhasil silahkan login");
};

export const loginUsers = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = sign({ email }, process.env.TOKEN_KEY || "secret", {
    expiresIn: "12h",
  });
  const sendResponse = utilsResponse(0, "Login sukses", { token });
  return res.status(200).json(sendResponse);
};

export const getProfile = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  let query = `SELECT email,first_name,last_name,profile_image from users where email ='${email}'`;
  return handleResponse(query, res, "Sukses");
};

export const profileUpdate = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  const keys = Object.keys(req.body);
  const update = keys.map((val: any, i: number) => {
    const values = Object.values(req.body);
    return `${val} = '${values[i]}'`;
  });
  const query = `UPDATE users SET ${update.join(",")} WHERE email ='${email}'`;

  db.query(query, () => {
    const queryData = `SELECT email, first_name,last_name,profile_image FROM users WHERE email = '${email}'`;
    return handleResponse(queryData, res, "Update profil berhasil");
  });
};

export const updateProfileImage = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  const files = req.files as Express.Multer.File[];
  console.log(process.env.API_URL);
  const query = `UPDATE users SET profile_image='${process.env.API_URL}${files[0].filename}'`;
  db.query(query, () => {
    const queryData = `SELECT email, first_name,last_name,profile_image FROM users WHERE email = '${email}'`;
    return handleResponse(queryData, res, "Update profile image berhasil");
  });
};
