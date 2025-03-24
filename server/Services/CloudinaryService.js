import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


const uploadOnCloudinary = async (localFilePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.SECRET_KEY
    });
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File uploaded successfully on Cloudinary", response.url);

        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        fs.unlinkSync(localFilePath); 
        return null;
    }
};

export default uploadOnCloudinary;