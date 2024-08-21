import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { errorRequest, errorAuth } from "../middleware/handleError";
import db from "../config/db";

export const topUpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { top_up_amount } = req.body;

  const topupCheck = z.number().positive();
  const topupError = topupCheck.safeParse(top_up_amount).error;

  if (topupError) {
    return errorRequest(
      102,
      res,
      "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
    );
  }
  return next();
};
