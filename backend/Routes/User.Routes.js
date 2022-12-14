import  express  from "express";
const router=express.Router()
import {register,login,logout} from '../Controllers/User.Controller.js'

router.post("/signup", register)
router.post("/signin", login)
router.get("/logout",logout )


export default router