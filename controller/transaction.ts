import { Request, Response } from "express";
import {
  handleResponse,
  responseInformation,
} from "../middleware/handleResponse";

export const getBalance = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  const query = `SELECT balance FROM users WHERE email ='${email}'`;
  return handleResponse(query, res, "Get balance berhasil");
};
