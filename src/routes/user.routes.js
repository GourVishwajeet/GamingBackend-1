import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import {signupValidation,loginValidation} from "../middlewares/AuthValidation.middleware.js"
import {ensureAuthenticated} from "../middlewares/Auth.middeware.js"
import { asyncHandler } from "../utils/asyncHandler.js";
const testRouter = asyncHandler((req, res,)=>{
    res.status(200).json({
        hello:'world'
    })
})

const router = Router()

router.route("/register",signupValidation).post(registerUser)
router.route("/login",loginValidation).post(loginUser)
router.route("/loginss",ensureAuthenticated).post(testRouter)




export default router