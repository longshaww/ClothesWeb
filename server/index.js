require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 4000;

const route = require("./routes/index");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	user: process.env.MONGOUSER,
	pass: process.env.MONGOPASSWORD,
	dbName: "ClothesWeb",
});

app.use(express.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
// app.use("/public", express.static("public"));

app.use(cors());
app.use(cookieParser());

route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
