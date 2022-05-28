const express = require("express");
const router = express.Router();

const collectionsController = require("../../controllers/user/CollectionsController");

router.get("/", collectionsController.getAllProductWithOutPagination);
router.get("/new-arrivals", collectionsController.getAllNewArrivals);
router.get("/new-arrivals-home", collectionsController.getHomeNewArrivals);
router.get(
	"/new-arrivals-without-pag",
	collectionsController.getAllNewArrivalsWithOutPagination
);
router.get("/get-15-newarrivals",collectionsController.get15NewArrivals);

router.get("/tops", collectionsController.getAllTops);
router.get("/tops-without-pag", collectionsController.getAllTopsWithOutPag);
router.get("/bottoms", collectionsController.getAllBottoms);
router.get(
	"bottoms-without-pag",
	collectionsController.getAllBottomsWithOutPag
);
router.get("/accessories", collectionsController.getAllAccessories);
router.get(
	"/accessories-without-pag",
	collectionsController.getAllAccessoriesWithOutPag
);
router.get("/outerwears", collectionsController.getAllOuterwears);
router.get(
	"/outerwears-without-pag",
	collectionsController.getAllOuterwearsWithOutPagination
);
module.exports = router;
