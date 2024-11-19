import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
 
// loginn function 
// get email or username from frontend
// check if eamil or password not empty
// check if email or username existed
// throw error if not existed
// success


const registerUser = asyncHandler(async(req,res)=>{
    

   const { email, username, password,country, dateOfBirth, phone} = req.body
    console.log(req.body)
  
    if(
        [ email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All field are required")
    }

   const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username is already exists")
        return res.status(409).json( new ApiResponse(409, "User with email or username is already exists")
    )
    }

   const user = await User.create({
        email,
        password,
        username,
        dateOfBirth,
        country,
        phone,
    })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
   )
})  




const loginUser = asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      const authFailedError = "Authentication failed: email or password is incorrect.";
  
      // Validate input fields
      if ([email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "Email and password are required.");
      }
  
      // Find user by email
      const existedUser = await User.findOne({ email });
      if (!existedUser) {
        throw new ApiError(403, authFailedError);
      }
  
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, existedUser.password);
      if (!isPasswordCorrect) {
        throw new ApiError(403, authFailedError);
      }
  
      // Generate JWT Token
      const jwtToken = jwt.sign(
        { email: existedUser.email, _id: existedUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "24h" }
      );
  
      // Respond with user details and token
      return res.status(200).json({
        message: "Login successful.",
        success: true,
        jwtToken,
        user: {
          email: existedUser.email,
          username: existedUser.username,
        },
      });
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          message: error.message,
          success: false,
        });
      }
      console.error("Error during login:", error); // Log unexpected errors for debugging
      return res.status(500).json({
        message: "Internal server error.",
        success: false,
      });
    }
  });


export {registerUser, loginUser}
