const express = require('express');
const app = express();
const { PORT } = require('./config/env');
const loader = require('./config/index');
const Logger= require('./config/logger');
loader(app);

app.listen(PORT, () => {
    Logger.getInstance().logger.info(`Server is running on port ${PORT}`);
});
