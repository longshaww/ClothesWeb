require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 4000 || 5000;
const route = require("./routes/index");
const mongoose = require("mongoose");

try {
	mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: "Clothes",
	});
} catch (err) {
	console.log(err);
}

app.use(express.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
var corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser(process.env.signed_cookie));
app.use(express.static("public"));
route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
