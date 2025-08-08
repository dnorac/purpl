import express from "express";
import loginRouter from "./login/router";
import postsRouter from "./posts/router";
import usersRouter from "./users/router";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/", loginRouter);

export default router;
