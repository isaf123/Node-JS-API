import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { errorAuth } from "./handleError";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error("Token not found!");
    }

    const checkToken = verify(token, process.env.TOKEN_KEY || "secret");
    res.locals.decript = checkToken;

    next();
  } catch (error) {
    next(errorAuth(108, res, "Token tidak valid atau kadaluarsa"));
  }
};
