const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 2000 || 2001;
const routes = require("./../api/routes/index");

module.exports = (app) =>{

        app.use(express.json()); // support json encoded bodies
        app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

        app.use(cors());
        app.use(cookieParser(process.env.signed_cookie));
        app.use(express.static("public"));
        routes(app);
}