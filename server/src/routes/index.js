
const { Router }= require('express');
const router = Router();
const routerDesign =  require('./alumnos2do_router')

router.use('/',routerDesign  )

module.exports = router