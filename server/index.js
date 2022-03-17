require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 4000;
const route = require("./routes/index");
const sessionMiddleware = require("./middlewares/session.middleware");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: "Clothes",
});

app.use(express.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
// app.use("/public", express.static("public"));
var corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser(process.env.signed_cookie));
app.use(sessionMiddleware);
route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
