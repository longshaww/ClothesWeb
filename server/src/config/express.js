const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const routeV1 = require('../api/v1/router');
const routeV2 = require('../api/v2/routes/index');
const proxy = require('./proxy');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

module.exports = (app) => {
    app.use(express.json({ limit: '10kb' })); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms  :date[clf]'));
    app.use(cors({ credentials: true, origin: true }));
    app.use(cookieParser(process.env.signed_cookie));
    app.use('/api/static/', express.static(path.join(__dirname, '../api/public')));
    app.use(compression());
    // Data sanitization against XSS
    app.use(xss());
    // MongoDB data sanitization
    app.use(mongoSanitize());
    app.use(
        '/api',
        proxy(app, {
            v1: routeV1,
            v2: routeV2,
        })
    );
};
