const express = require("express");
const router = express.Router();

const billController = require("../../controllers/user/BillController");
router.post("/info", billController.addNewInfoUser);
router.put("/info/:id", billController.editInfoUser);
router.delete("/info/:id", billController.deleteInfoUser);
router.post("/listInfo", billController.listInfo);

module.exports = router;
