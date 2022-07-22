const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config({ path: ".env" })

const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")

app.use(expressLayouts)
app.use(express.static("public"))

//connecting to mongoDB jj
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("Connected to MongoDB"))

app.get("/", (req, res) => {
  res.render("index")
})

app.listen(PORT, () => {
  console.log("Server is running on " + PORT)
})
