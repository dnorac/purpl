import express, { type Request, type Response } from "express";
import User from "./model";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await User.find({}, "-password");
  res.json(users);
});

export default router;
