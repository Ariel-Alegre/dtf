
const { Router }= require('express');
const router = Router();
const {updatePrices} = require("../controllers/Prices")
const {AllPrices} = require("../controllers/AllPrices")

router.post("/prices", updatePrices)
router.get("/prices", AllPrices)



module.exports = router

