require("dotenv").config({ path: ".env" })
const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3000

const authorRouter = require("./routes/authors")
const indexRouter = require("./routes/index")

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")

app.use(expressLayouts)
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

// Connecting to MongoDB
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to MongoDB"))

// Connecting to routers
app.use("/", indexRouter)
app.use("/authors", authorRouter)

app.listen(PORT, () => {
  console.log("Server is running on " + PORT)
})
