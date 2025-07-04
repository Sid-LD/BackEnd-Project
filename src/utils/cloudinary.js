import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        //upload file on cloudinary
       const response=await  cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded successfully
        console.log("File cloudinary par upload ho gayi hai  ",response.url);
        return response
        
        
    } catch (error) {
        fs.unlinkSync(localFilePath)//removed the locally saved temporary file as upload operation got failed
        return null
    }
}

export {uploadCloudinary}