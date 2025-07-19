import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    } ,
    location : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    } ,
    image : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    menu : {
        type : String
    },
    image_gallery : {
        type : Array
    }
});

const Restaurants = mongoose.model("Restaurants",restaurantSchema);
export default Restaurants;