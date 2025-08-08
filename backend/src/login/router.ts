import express, { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { withAuth } from "../middlewares";
import User from "../users/model";

const router = express.Router();

router.get("/checkToken", withAuth, async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  res.json(user.toObject());
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.isCorrectPassword(password)) return res.sendStatus(401);
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "1h",
  });
  return res.cookie("token", token, { httpOnly: true }).json(user.toObject());
});

router.get("/logout", async (req: Request, res: Response) => {
  return res.clearCookie("token").sendStatus(200);
});

router.post("/register", async (req: Request, res: Response) => {
  const data = req.body;
  console.log("Backend received registration data:", data);

  const required = [
    "firstName",
    "lastName",
    "email",
    "password",
    "passwordRepeat",
  ];

  const hasRequiredKeys = (keys, object) =>
    keys.every((key) => Object.prototype.hasOwnProperty.call(object, key));

  const passwordConfirmed = ({ password, passwordRepeat }) =>
    password === passwordRepeat;

  if (!hasRequiredKeys(required, data)) {
    console.log(
      "Missing required fields. Expected:",
      required,
      "Got:",
      Object.keys(data)
    );
    return res.status(401).json({ error: "Missing required fields" });
  }

  if (!passwordConfirmed(data)) {
    console.log("Passwords don't match");
    return res.status(401).json({ error: "Passwords don't match" });
  }

  try {
    const newUser = await User.create(data);

    // Create JWT token and set cookie for automatic login after registration
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    return res
      .cookie("token", token, { httpOnly: true })
      .json({ status: "success", user: newUser });
  } catch (error) {
    res.json({ status: "error", error: "User already exists" });
  }
});

router.post("/updateProfile", withAuth, async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body;
    const user = await User.findOneAndUpdate({ _id: req.userId }, { avatar });
    res.json(user.toObject());
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

export default router;
