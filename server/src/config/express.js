const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./../api/routes/index');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
module.exports = (app) => {
    app.use(express.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :date[clf]'));
    app.use(cors({ credentials: true, origin: true }));
    app.use(cookieParser(process.env.signed_cookie));
    app.use('/api/static', express.static(path.join(__dirname, '../api/public')));
    app.use(compression());
    app.use('/api', routes);
};
