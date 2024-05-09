
const { Router }= require('express');
const router = Router();
const routerDesign =  require('./alumnos2do_router')
const routerPrices=  require('./Prices')


router.use('/',routerDesign, routerPrices  )

module.exports = router