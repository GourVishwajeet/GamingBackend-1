import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/admin/category.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
 

const submitCategory = asyncHandler(async(req,res)=>{
    

   const { title,
           icon,
           status,
           ActiveTournament,
           ActiveTeam,
           ActiveMatch} = req.body
    console.log(req.body)
  
   const existedCategory = await Category.findOne({
        $or: [{ title }, { icon }]
    })

    if(existedCategory){
       throw new ApiError(409, "Category is already exists")
    
      } 

   const category = await Category.create({
    title,
    icon,
    status,
    ActiveTournament,
    ActiveTeam,
    ActiveMatch
    })

   const createdCategory = await Category.findById(category._id)

   if(!createdCategory){
    throw new ApiError(500, "Something went wrong while registering the user")
   }

   return res.status(201).json(
    new ApiResponse(200, createdCategory, "Category submitted Successfully")
   )
})  






export {submitCategory}
