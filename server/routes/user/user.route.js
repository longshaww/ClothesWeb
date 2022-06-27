const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/UserController");
router.get("/getUser/:id",userController.getUser);

module.exports = router;
