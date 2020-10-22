const mongoose = require("mongoose")

const onConnect = error => {
  if (error) {
    console.error("[MongoDB]", error)
    process.exit(1)
  }
  console.log("[MongoDB] Connected")
}

mongoose.connect(
  process.env.MONGOURI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  onConnect
)
