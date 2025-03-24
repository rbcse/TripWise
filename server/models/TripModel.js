import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    trip_name : {
        type : String, 
        required : true
    } ,
    user_id : {
        type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true
    },
    places : [
        {type : String}
    ],
    hotels : [
        {type : String}
    ],
    restaurants : [
        {type : String}
    ],
    date_of_arrival : {
        type : Date,
        required : true
    },
    date_of_return : {
        type : Date,
        required : true
    }
});

const Trip = mongoose.model("Trip",tripSchema);
export default Trip;