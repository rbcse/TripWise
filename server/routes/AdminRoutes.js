import express from "express";
import { adminLogin , addPlace , addHotel, addRestaurant } from "../controllers/AdminController.js";
import upload from "../Services/Multer.js";

const adminRouter = express.Router();

adminRouter.post("/login",adminLogin);
adminRouter.post("/add-place",upload.single('image'),addPlace);
adminRouter.post("/add-hotel",upload.single('image'),addHotel);
adminRouter.post("/add-restaurant", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "menu", maxCount: 1 }
]), addRestaurant);

export default adminRouter;