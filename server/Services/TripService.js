import Places from "../models/PlaceModel.js";
import Hotels from "../models/HotelModel.js";
import Trip from "../models/TripModel.js";
import Restaurants from "../models/RestaurantModel.js";

class TripService{

    static async findAllPlaces(){
        return await Places.find();
    }

    static async findAllHotels(){
        return await Hotels.find();
    }

    static async findAllRestaurants(){
        return await Restaurants.find();
    }

    static async createTrip(tripData){
        return await Trip.create(tripData);
    }

    static async getUserTrips(userId){
        return await Trip.find({user_id : userId});
    }

    static async addUserTripPlaces(tripId, place) {
        return await Trip.findByIdAndUpdate(
            tripId, 
            { $addToSet: { places: place } }, 
            { new: true } 
        );
    }    

    static async removeUserTripPlace(tripId, place) {
        return await Trip.findByIdAndUpdate(
            tripId, 
            { $pull: { places: place } },  
            { new: true }  
        );
    }

    static async addUserTripHotels(tripId, hotel) {
        return await Trip.findByIdAndUpdate(
            tripId, 
            { $addToSet: { hotels: hotel } }, 
            { new: true } 
        );
    }    

    static async removeUserTripHotel(tripId, hotel) {
        return await Trip.findByIdAndUpdate(
            tripId, 
            { $pull: { hotels: hotel } },  
            { new: true }  
        );
    }

    static async addUserTripRestaurant(tripId,restaurant){
        return await Trip.findByIdAndUpdate(
            tripId,
            { $addToSet: { restaurants: restaurant } }, 
            { new: true } 
        );
    }

    static async removeUserTripRestaurant(tripId, restaurant) {
        return await Trip.findByIdAndUpdate(
            tripId, 
            { $pull: { restaurants: restaurant } },  
            { new: true }  
        );
    }

    static async getTripsForUser(user_id){
        return await Trip.find({user_id});
    }

    static async deleteTrip(tripId) {
        return await Trip.findByIdAndDelete(tripId);
    }    
    
};

export default TripService;