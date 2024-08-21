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

export const transactionValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = res.locals.decript.email;
  const { service_code } = req.body;
  const query = `SELECT balance FROM users WHERE email='${email}'`;
  const queryServiceCost = `SELECT service_tariff FROM services  WHERE service_code='${service_code}'`;
  db.query(query, (err, result: any[]) => {
    const balance = result[0].balance;
    db.query(queryServiceCost, (err, result: any) => {
      const serviceCost = result[0].service_tariff;

      if (serviceCost > balance) {
        return res.status(400).json({
          status: 102,
          message: "Saldo tidak cukup silahkan topup",
          data: null,
        });
      }
      return next();
    });
  });
};
