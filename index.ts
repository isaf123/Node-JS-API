import express, { Application, Request, Response } from "express";
import router from "./router";
import cors from "cors";
import dotenv from "dotenv";

const app: Application = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use("/", express.static("public/profileImage"));
app.get("/", (req: Request, res: Response) => {
  res.send(`GET API SUCCESS!`);
});
app.use("/", router);
app.listen(PORT, () => {
  console.log("API RUNNING", PORT);
});
