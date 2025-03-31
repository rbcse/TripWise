import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    trip_name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    places: [
        { type: String }
    ],
    hotels: [
        { type: String }
    ],
    restaurants: [
        { type: String }
    ],
    date_of_arrival: {
        type: Date,
        required: true
    },
    date_of_return: {
        type: Date,
        required: true
    },
    trip_sequence: [
        {
            type: {
                type: String,
                enum: ["place", "hotel", "restaurant"],
                required: true
            },
            name: {
                type: String,
                required: true
            },
            date: {
                type: Date
            }
        }
    ]
});

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
