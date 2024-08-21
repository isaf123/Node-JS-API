import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { errorRequest, errorAuth } from "../middleware/handleError";
import db from "../config/db";
export const regisValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  //check email
  const emailcheck = z.string().email();
  const emailvalidation = emailcheck.safeParse(email);
  if (emailvalidation.error) {
    return errorRequest(102, res, "Parameter email tidak sesuai format");
  }

  //check password
  const passwordCheck = z.string().min(8);
  const passwordValidation = passwordCheck.safeParse(password);
  if (passwordValidation.error) {
    return errorRequest(102, res, "Password minimal 8 karakter");
  }

  //check existing email
  const query = `SELECT * FROM users WHERE email='${email}'`;
  db.query(query, (err, result: any[]) => {
    if (result.length) {
      return errorRequest(102, res, "Email sudah terdaftar");
    }
    return next();
  });
};

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const emailcheck = z.string().email();
  const emailvalidation = emailcheck.safeParse(email);
  if (emailvalidation.error) {
    return errorRequest(102, res, "Parameter email tidak sesuai format");
  }

  const passwordCheck = z.string().min(8);
  const passwordValidation = passwordCheck.safeParse(password);
  if (passwordValidation.error) {
    return errorRequest(102, res, "Password minimal 8 karakter");
  }

  const query = `SELECT * FROM users where email='${email}' and password='${password}'`;
  db.query(query, (err, result: any[]) => {
    console.log(result);

    if (!result.length) {
      return errorAuth(103, res, "Username atau pasword salah");
    }
    return next();
  });
};
