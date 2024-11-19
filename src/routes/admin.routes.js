import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import {submitCategory} from '../controllers/category.controllers.js'
import {signupValidation,loginValidation} from "../middlewares/AuthValidation.middleware.js"
import {ensureAuthenticated} from "../middlewares/Auth.middeware.js"
import { asyncHandler } from "../utils/asyncHandler.js";
const testRouter = asyncHandler((req, res,)=>{
    res.status(200).json({
        hello:'world'
    })
})

const adminRouter = Router()

adminRouter.route("/category").post(submitCategory)
adminRouter.route("/login",loginValidation).post(loginUser)
adminRouter.route("/loginss",ensureAuthenticated).post(testRouter)




export default adminRouter