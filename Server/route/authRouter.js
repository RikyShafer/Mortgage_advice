const express=require("express")
const authCountroller=require("../controllers/authCountroller")
const router =express.Router()

router.post("/login", authCountroller.login)
router.post("/registeration", authCountroller.registeration)
router.get("/refresh", authCountroller.refresh)
router.post("/logout", authCountroller.logout)

module.exports=router