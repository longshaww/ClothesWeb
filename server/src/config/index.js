const expressLoad = require("./express");
const mongooseLoad = require("./database");

module.exports = async app =>
{
    await mongooseLoad()
    await expressLoad(app)
}