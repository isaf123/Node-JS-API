import { Request, Response } from "express";
import {
  handleResponse,
  handleResponsePayment,
  responseInformation,
} from "../middleware/handleResponse";
import db from "../config/db";

import { errorRequest } from "../middleware/handleError";

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
      db.query(queryBalance, (err) => {
        if (err)
          return db.rollback(() => {
            throw err;
          });
      });
      db.query(queryTrans, (err) => {
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

export const transaction = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  const { service_code } = req.body;
  const date = new Date();
  const invoiceNumber = `INV${date.getTime()}`;

  const query = `SELECT * FROM services WHERE service_code ='${service_code}'`;
  const queryId = `SELECT id FROM USERS WHERE email ='${email}'`;
  db.query(queryId, (err, result: any[]) => {
    const userId = result[0].id;

    db.query(query, (err, result: any[]) => {
      const data = result[0];
      if (!result.length) {
        return errorRequest(102, res, "Service atau layanan tidak ditemukan");
      }

      const { service_name, service_tariff } = data;

      const queryBalance = `UPDATE users SET balance=balance -${service_tariff} WHERE id=${userId}`;
      const queryTrans = `insert into transactions (
        invoice_number,
        transaction_type,
        description,
        total_amount,
        user_id) values('${invoiceNumber}','PAYMENT','${service_name}',${service_tariff},${userId})`;

      db.beginTransaction((err) => {
        if (err) {
          return res.status(500).json({ err });
        }
        db.query(queryBalance, (err) => {
          if (err)
            return db.rollback(() => {
              throw err;
            });
        });
        db.query(queryTrans, (err) => {
          if (err)
            return db.rollback(() => {
              throw err;
            });
        });
      });
      return handleResponsePayment(res, userId);
    });
  });
};
