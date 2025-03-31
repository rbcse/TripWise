import uploadOnCloudinary from "../Services/CloudinaryService.js";
import AdminService from "../Services/AdminService.js";
const adminLogin = async (req,res) => {
    try {
        const adminEmail = req.body.email;
        const adminPassword = req.body.password;
        const actualAdminEmail = process.env.ADMIN_EMAIL;
        const actualAdminPassword = process.env.ADMIN_PASSWORD;

        if(adminEmail === actualAdminEmail && adminPassword === actualAdminPassword){
            return res.status(200).json({success : true});
        }

        else{
            return res.status(200).json({success : false , error : 'Invalid Admin Credentials'});
        }
    } catch (error) {
        return res.json({success : false , error : error});
    }
}

const addPlace = async (req,res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const localFilePath = req.file.path; 
        console.log("Local path" , localFilePath);

        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        if(cloudinaryResponse){
            const placeData = {
                name : req.body.name ,
                location : req.body.location,
                rating: req.body.rating,
                image : cloudinaryResponse.url,
                description : req.body.description
            };

            const addResult = await AdminService.addPlace(placeData);
            if(addResult){
                return res.status(200).json({success : true , message : "Place added successfully"});
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
const addHotel = async (req,res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const localFilePath = req.file.path; 
        console.log("Local path" , localFilePath);

        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        if(cloudinaryResponse){
            const hotelData = {
                name : req.body.name ,
                location : req.body.location,
                rating: req.body.rating,
                image : cloudinaryResponse.url,
                description : req.body.description
            };

            const addResult = await AdminService.addHotel(hotelData);
            if(addResult){
                return res.status(200).json({success : true , message : "Hotel added successfully"});
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

const addRestaurant = async (req, res) => {
    try {
        console.log(req.files);

        if (!req.files || (!req.files.image && !req.files.menu)) {
            return res.status(400).json({ error: "Image and menu files are required" });
        }

        let imageUrl = "";
        let menuUrl = "";

        // Upload image to Cloudinary
        if (req.files.image) {
            const cloudinaryImageResponse = await uploadOnCloudinary(req.files.image[0].path);
            if (cloudinaryImageResponse) {
                imageUrl = cloudinaryImageResponse.url;
            } else {
                return res.status(400).json({ error: "Failed to upload image" });
            }
        }

        // Upload menu to Cloudinary
        if (req.files.menu) {
            const cloudinaryMenuResponse = await uploadOnCloudinary(req.files.menu[0].path);
            if (cloudinaryMenuResponse) {
                menuUrl = cloudinaryMenuResponse.url;
            } else {
                return res.status(400).json({ error: "Failed to upload menu" });
            }
        }

        // Create restaurant object
        const restaurantData = {
            name: req.body.name,
            location: req.body.location,
            rating: req.body.rating,
            image: imageUrl,
            menu: menuUrl,
            description: req.body.description
        };

        // Save restaurant in database
        const addResult = await AdminService.addRestaurant(restaurantData);

        if (addResult) {
            return res.status(200).json({ success: true, message: "Restaurant added successfully" });
        } else {
            return res.status(500).json({ success: false, message: "Failed to add restaurant" });
        }
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const updateHotel = async (req,res) => {
    try {
        const hotel = req.body;
        const result = await AdminService.updateHotel(hotel);
        if(result){
            return res.status(200).json({ success: true});
        }
        else{
            return res.status(200).json({ success: false});
        }
    } catch (error) {
        return res.status(200).json({ success: false , error : error});
    }
}
const updatePlace = async (req,res) => {
    try {
        const place = req.body;
        const result = await AdminService.updatePlace(place);
        if(result){
            return res.status(200).json({ success: true});
        }
        else{
            return res.status(200).json({ success: false});
        }
    } catch (error) {
        return res.status(200).json({ success: false , error : error});
    }
}
const updateRestaurant = async (req,res) => {
    try {
        const restaurant = req.body;
        const result = await AdminService.updateRestaurant(restaurant);
        if(result){
            return res.status(200).json({ success: true});
        }
        else{
            return res.status(200).json({ success: false});
        }
    } catch (error) {
        return res.status(200).json({ success: false , error : error});
    }
}


export {adminLogin , addPlace , addHotel , addRestaurant , updateHotel , updatePlace , updateRestaurant};