const express = require('express');
const app = express();
const { PORT } = require('./config/env');
const loader = require('./config/index');

loader(app);

app.listen(PORT, () => {
    console.log(`Example app listening at port ${PORT}`);
});
