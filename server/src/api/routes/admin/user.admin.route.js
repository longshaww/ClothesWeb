const express = require("express");
const router = express.Router();
const userController = require("../../controllers/admin/UserAdminController")
router.get("/getAllUser",userController.getAllUser);
router.delete("/banUser/:id",userController.banUser);
router.get("/openBan/:id",userController.openBanUser);
module.exports = router;
