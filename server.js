const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const dotenv = require("dotenv").config

const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")

app.use(expressLayouts)
app.use(express.static("public"))

//connecting mongoDB
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL)

app.get("/", (req, res) => {
  res.render("index")
})

app.listen(PORT, () => {
  console.log("Server is running on " + PORT)
})
