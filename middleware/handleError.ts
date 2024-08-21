import db from "../config/db";
import { Request, Response } from "express";

export const errorRequest = (
  status: number,
  res: Response,
  message: string
) => {
  return res.status(400).json({
    status,
    message,
    data: null,
  });
};

export const errorAuth = (status: number, res: Response, message: string) => {
  return res.status(401).json({
    status,
    message,
    data: null,
  });
};
