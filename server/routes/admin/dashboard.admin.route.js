const express = require("express");
const router = express.Router();

const dashBoardController  = require("../../controllers/admin/DashBoardController");
router.get("/",(req,res,next)=>{
        res.send("hello");
})


router.get("/getDashBoard",dashBoardController.getDashboard);
module.exports = router;
