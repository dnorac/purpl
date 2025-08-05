const express = require("express");
const usersRouter = require("./users/router");
const loginRouter = require("./login/router");
const postsRouter = require("./posts/router");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/", loginRouter);

module.exports = router;
