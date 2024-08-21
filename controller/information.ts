import { Request, Response } from "express";
import { responseInformation } from "../middleware/handleResponse";

export const getBanner = (req: Request, res: Response) => {
  let query = "SELECT * FROM banner";
  return responseInformation(query, res, "Sukses");
};

export const getService = (req: Request, res: Response) => {
  let query = "SELECT * FROM services";
  return responseInformation(query, res, "Sukses");
};
