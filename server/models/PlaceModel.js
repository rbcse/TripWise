import mongoose from 'mongoose';

const placesSchema = new mongoose.Schema({
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

const Places = mongoose.model("Places" , placesSchema);
export default Places;