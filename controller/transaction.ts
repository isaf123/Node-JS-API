import { Request, Response } from "express";
import {
  handleResponse,
  responseInformation,
} from "../middleware/handleResponse";
import db from "../config/db";
import { log } from "console";

export const getBalance = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  const query = `SELECT balance FROM users WHERE email ='${email}'`;
  return handleResponse(query, res, "Get balance berhasil");
};

export const topup = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  const { top_up_amount } = req.body;
  const date = new Date();
  const query = `SELECT id FROM USERS WHERE email ='${email}'`;

  const invoiceNumber = `INV${date.getTime()}`;
  db.query(query, (err, result: any[]) => {
    const userId = result[0].id;
    const queryBalance = `UPDATE users SET balance=balance +${top_up_amount} WHERE id=${userId}`;
    const queryTrans = `insert into transactions (
      invoice_number,
      transaction_type,
      description,
      total_amount,
      user_id) values('${invoiceNumber}','TOPUP','Top Up balance',${top_up_amount},${userId})`;

    db.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({ err });
      }
      db.query(queryBalance, (err, result) => {
        if (err)
          return db.rollback(() => {
            throw err;
          });
      });
      db.query(queryTrans, (err, result) => {
        if (err)
          return db.rollback(() => {
            throw err;
          });
      });
    });
    const queryResponse = `SELECT balance FROM USERS WHERE id=${userId}`;
    return handleResponse(queryResponse, res, "Top Up Balance berhasil");
  });
};
