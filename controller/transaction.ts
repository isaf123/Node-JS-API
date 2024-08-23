import { Request, Response } from "express";
import {
  handleResponse,
  handleResponsePayment,
  responseInformation,
  responseTransactionHistory,
} from "../middleware/handleResponse";
import db from "../config/db";
import { promisify } from "util";
import { RowDataPacket } from "mysql2";

const queryAsync = promisify<string, RowDataPacket[]>(db.query).bind(db);

export const checkTrans = async (req: Request, res: Response) => {
  const balance = await queryAsync(`SELECT * FROM users`);
};

export const getBalance = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  const query = `SELECT balance FROM users WHERE email ='${email}'`;
  return handleResponse(query, res, "Get balance berhasil");
};

export const topup = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  const { top_up_amount } = req.body;
  const date = new Date();
  const query = `SELECT id FROM users WHERE email ='${email}'`;

  const invoiceNumber = `INV${date.getTime()}`;
  db.query(query, (err, result: any[]) => {
    const userId = result[0].id;
    console.log(userId);

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
        console.log(result);
      });
      db.query(queryTrans, (er, result) => {
        if (err)
          return db.rollback(() => {
            throw err;
          });
        console.log(result);
      });
      const queryResponse = `SELECT balance FROM users WHERE id=${userId}`;
      return handleResponse(queryResponse, res, "Top Up Balance berhasil");
    });
  });
};

export const transaction = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  const { service_code } = req.body;
  const date = new Date();
  const invoiceNumber = `INV${date.getTime()}`;

  const query = `SELECT * FROM services WHERE service_code ='${service_code}'`;
  const queryId = `SELECT id FROM users WHERE email ='${email}'`;
  db.query(queryId, (err, result: any[]) => {
    const userId = result[0].id;

    db.query(query, (err, result: any[]) => {
      const data = result[0];

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
        return handleResponsePayment(res, userId);
      });
    });
  });
};

export const transactionHistory = (req: Request, res: Response) => {
  const email = res.locals.decript.email;
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  const keyObject = Object.keys(req.query);
  const parameter = [] as any[];
  keyObject.forEach((val, i: number) => {
    const values = Object.values(req.query);
    const params = `${val} ${Number(values[i])}`;
    parameter.push(params);
  });

  const queryUserId = `SELECT id FROM users WHERE email='${email}'`;

  db.query(queryUserId, (err, result: any[]) => {
    const userId = result[0].id;
    const query = `SELECT invoice_number, 
    transaction_type, 
    description, 
    total_amount, 
    created_on 
    FROM transactions WHERE user_id =${userId} ${parameter.join(" ")}`;

    return responseTransactionHistory(res, query, { limit, offset });
  });
};
