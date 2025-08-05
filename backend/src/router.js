const express = require("express");
const usersRouter = require("./users/router");
const loginRouter = require("./login/router");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/", loginRouter);

module.exports = router;
