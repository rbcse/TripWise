import Places from "../models/PlaceModel.js";
import Hotels from "../models/HotelModel.js";
import Restaurants from "../models/RestaurantModel.js";

class AdminService{

    static async addPlace(placeData){
        return Places.create(placeData);
    }
    static async addHotel(hotelData){
        return Hotels.create(hotelData);
    }

    static async addRestaurant(restaurantData){
        return Restaurants.create(restaurantData);
    }

    static async findAllPlaces(){
        return await Places.find();
    }

};

export default AdminService;