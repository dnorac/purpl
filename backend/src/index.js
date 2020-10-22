require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")

const router = require("./router")

require("./config/db")

const app = express()
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use("/api", router)

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>
  console.log(`App listening on ${process.env.DOMAIN}:${PORT}`)
)
