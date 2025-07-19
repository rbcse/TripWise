import express from "express";
import { adminLogin , addPlace , addHotel, addRestaurant, updateHotel, updatePlace, updateRestaurant , addReligiousPlace } from "../controllers/AdminController.js";
import upload from "../Services/Multer.js";
import { addImgToGalleryHotels, addImgToGalleryPlaces, addImgToGalleryReligiousPlaces, addImgToGalleryRestaurants } from "../controllers/AdminController2.js";

const adminRouter = express.Router();

adminRouter.post("/login",adminLogin);
adminRouter.post("/add-place",upload.single('image'),addPlace);
adminRouter.post("/add-hotel",upload.single('image'),addHotel);
adminRouter.post("/add-restaurant", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "menu", maxCount: 1 }
]), addRestaurant);
adminRouter.post("/add-religious-place",upload.single('image'),addReligiousPlace);
adminRouter.post("/update-hotel",updateHotel);
adminRouter.post("/update-place",updatePlace);
adminRouter.post("/update-restaurant",updateRestaurant);
adminRouter.post("/add-image-to-gallery-religious-place",upload.single('image'),addImgToGalleryReligiousPlaces);
adminRouter.post("/add-image-to-gallery-place",upload.single('image'),addImgToGalleryPlaces);
adminRouter.post("/add-image-to-gallery-hotel",upload.single('image'),addImgToGalleryHotels);
adminRouter.post("/add-image-to-gallery-restaurant",upload.single('image'),addImgToGalleryRestaurants);

export default adminRouter;