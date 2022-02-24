require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 4000;

const collectionsRoute = require("./routes/products.route");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ClothesWeb", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use("/public", express.static("public"));

app.use(cors());
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/collections", collectionsRoute);
// app.use("/management", roomsRoute);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
