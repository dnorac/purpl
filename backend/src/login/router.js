const express = require("express")
const User = require("../users/model")
const faker = require("faker")
const jwt = require("jsonwebtoken")
const { withAuth } = require("../middlewares")

const router = express.Router()

router.get("/checkToken", withAuth, async (req, res) => {
  const user = await User.findById(req.userId)
  res.json(user.toObject())
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.isCorrectPassword(password)) return res.sendStatus(401)
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "1h",
  })
  return res.cookie("token", token, { httpOnly: true }).json(user.toObject())
})

router.get("/logout", async (req, res) => {
  return res.clearCookie("token").sendStatus(200)
})

router.post("/register", async (req, res) => {
  const data = req.body
  const required = [
    "firstName",
    "lastName",
    "email",
    "password",
    "passwordRepeat",
  ]

  const hasRequiredKeys = (keys, object) =>
    keys.every(key => object.hasOwnProperty(key))

  const passwordConfirmed = ({ password, passwordRepeat }) =>
    password === passwordRepeat

  if (!hasRequiredKeys(required, data) || !passwordConfirmed(data))
    return res.sendStatus(401)

  const newUser = await User.create({
    ...data,
    avatar: faker.image.avatar(),
  })
  res.json(newUser)
})

router.post("/updateProfile", withAuth, async (req, res) => {
  try {
    const { avatar } = req.body
    const user = await User.findOneAndUpdate({ _id: req.userId }, { avatar })
    res.json(user.toObject())
  } catch (error) {
    console.log(error.message)
    res.sendStatus(400)
  }
})

module.exports = router
