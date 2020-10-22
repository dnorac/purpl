const jwt = require("jsonwebtoken")

const withAuth = (req, res, next) => {
  const { token } = req.cookies
  if (!token) return res.sendStatus(401)
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    req.userId = decoded.id
  } catch (error) {
    console.error(error.message)
    res.sendStatus(401)
  }
  next()
}

module.exports = {
  withAuth,
}
