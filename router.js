

//const router = require("express").Router()

import {Router} from "express"

const router = new Router()

import  trx from "./controllers/trxController.js"
// const hook = require("./controllers/webhookController")




router.post("/trx/reservedAccount", trx.generateReservedAccount)
router.get("/trx/reservedAccount/:accountReference", trx.getReservedAccount)
router.delete("/trx/reservedAccount/:accountReference", trx.deallocateReservedAccount)


export default router;