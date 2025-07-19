import uploadOnCloudinary from "../Services/CloudinaryService.js";
import AdminService from "../Services/AdminService.js";

const addImgToGalleryReligiousPlaces = async (req,res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const localFilePath = req.file.path; 
        console.log("Local path" , localFilePath);

        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        if(cloudinaryResponse){
            const imageUrl = cloudinaryResponse.url;
            const addToGallery = await AdminService.addImgReligiousPlacesGallery(req.body.religiousPlaceId , imageUrl);
            if(addToGallery){
                return res.status(200).json({success : true , message : "Image added to gallery"});
            }
            else{
                return res.status(200).json({success : false , message : "Something went wrong , try again"});
            }
        }
        else{
            return res.status(404).json({success : false , message : "Please upload the image"});
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
const addImgToGalleryPlaces = async (req,res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const localFilePath = req.file.path; 
        console.log("Local path" , localFilePath);

        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        if(cloudinaryResponse){
            const imageUrl = cloudinaryResponse.url;
            const addToGallery = await AdminService.addImgPlacesGallery(req.body.placeId , imageUrl);
            if(addToGallery){
                return res.status(200).json({success : true , message : "Image added to gallery"});
            }
            else{
                return res.status(200).json({success : false , message : "Something went wrong , try again"});
            }
        }
        else{
            return res.status(404).json({success : false , message : "Please upload the image"});
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
const addImgToGalleryHotels = async (req,res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const localFilePath = req.file.path; 
        console.log("Local path" , localFilePath);

        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        if(cloudinaryResponse){
            const imageUrl = cloudinaryResponse.url;
            const addToGallery = await AdminService.addImgHotelsGallery(req.body.hotelId , imageUrl);
            if(addToGallery){
                return res.status(200).json({success : true , message : "Image added to gallery"});
            }
            else{
                return res.status(200).json({success : false , message : "Something went wrong , try again"});
            }
        }
        else{
            return res.status(404).json({success : false , message : "Please upload the image"});
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
const addImgToGalleryRestaurants = async (req,res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const localFilePath = req.file.path; 
        console.log("Local path" , localFilePath);

        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        if(cloudinaryResponse){
            const imageUrl = cloudinaryResponse.url;
            const addToGallery = await AdminService.addImgRestaurantsGallery(req.body.restaurantId , imageUrl);
            if(addToGallery){
                return res.status(200).json({success : true , message : "Image added to gallery"});
            }
            else{
                return res.status(200).json({success : false , message : "Something went wrong , try again"});
            }
        }
        else{
            return res.status(404).json({success : false , message : "Please upload the image"});
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

export {addImgToGalleryReligiousPlaces , addImgToGalleryPlaces , addImgToGalleryHotels , addImgToGalleryRestaurants};