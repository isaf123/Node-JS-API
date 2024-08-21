import { Response, Request, NextFunction } from "express";
import fs from "fs";
import { join } from "path";
import { z } from "zod";
import { errorRequest, errorAuth } from "../middleware/handleError";

export const validationImg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as Express.Multer.File[];
  try {
    const pic = files[0].filename;

    const checkTypeFile = z.string().regex(/\.(jpg|png)$/i);
    const checkValidation = checkTypeFile.safeParse(pic).error;

    if (checkValidation) {
      throw "Format image tidak sesuai";
    }
    return next();
  } catch (error: any) {
    fs.unlinkSync(
      join(__dirname, "../public/profileImage", `/${files[0].filename}`)
    );
    return errorRequest(102, res, error);
  }
};
