import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
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
    image_gallery : {
        type : Array
    }
});

const Hotels = mongoose.model("Hotels" , hotelSchema);
export default Hotels;