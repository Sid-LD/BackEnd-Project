import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async (req,res)=>{
    //get user from frontend
    //validatiion-not empty
    //check if user already exists using email or username
    //if exists, send error
    //if not, create user
    //check for images and avatar
    //if images, upload to cloudinary
    //create user object-create entry in db
    //remove password and refresh token from response
    //check for user creation
    //return res

    const {fullName,email,username,password}=req.body
    console.log("Fullname ",fullName);


if (
  fullName.trim() === "" || 
  email.trim() === "" || 
  username.trim() === "" || 
  password.trim() === ""
) {
  throw new ApiError(400, "All fields are required");
}

const existedUser=User.findOne({
  $or:[{username},{email}]
})

if(existedUser){
  throw new ApiError(409,"User with email and password already exist")
}

const avatarLocalPath=req.files?.avatar[0].path // 1st file in the array
const coverImageLocalPath=req.files?.coverImage[0].path

if(!avatarLocalPath){
  throw new ApiError(400,"Avatar file is required")
}

const avatar=await uploadCloudinary(avatarLocalPath)
const coverImage=await uploadCloudinary(coverImageLocalPath)

if(!avatar){
  throw new ApiError(400,"Avatar file is required")
}

const user=User.create({
  fullName:fullName,
  email:email,
  username:username.toLowerCase(),
  avatar:avatar.url,
  coverImage:coverImage?.url || "",
  password:password
})

const createdUser=await User.findById(user._id).select("-password -refreshToken")

if(!createdUser){
  throw new ApiError(500,"Something went wrong while registering the user")
}

return res.status(201).json(
  new ApiResponse(200,createdUser,"User successfully registered")
)

})



export {registerUser}