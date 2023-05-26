const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const product  = require("./routes/ProductRoute");
app.use(cookieParser())

const car = require("./routes/CarRoute")
const user = require("./routes/UserRoute");
app.use("/api/v1",user)
app.use("/api/v1",car)


module.exports =app