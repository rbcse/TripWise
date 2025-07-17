import mongoose from "mongoose";

const religiousPlaceSchema = new mongoose.Schema({
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
    } , 
    image_gallery : {
        type : Array
    }
});

const ReligiousPlace =  mongoose.model("ReligiousPlace",religiousPlaceSchema);
export default ReligiousPlace;