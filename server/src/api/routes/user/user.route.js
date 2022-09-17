const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user/UserController");
router.get("/getUser/:id",userController.getUser);
router.put("/editUser/:id",userController.editUser);
router.get("/getBillUser/:id",userController.getBillUser);
module.exports = router;
