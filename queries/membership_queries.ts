import { IRegis } from "../interface/regis.interface";

export const regisQuery = (req: IRegis) => {
  const { email, first_name, last_name, password } = req;

  let query = `insert into users (email,first_name,last_name,password) values (${email},${first_name},${last_name},${password})`;

  return query;
};
