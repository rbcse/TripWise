import Places from "../models/PlaceModel.js";
import Hotels from "../models/HotelModel.js";
import Restaurants from "../models/RestaurantModel.js";
import ReligiousPlace from "../models/ReligiousPlacesModel.js";

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

    static async addReligiousPlaces(placeData){
        return ReligiousPlace.create(placeData);
    }

    static async findAllPlaces(){
        return await Places.find();
    }

    static async updateHotel(hotel){
        return Hotels.findByIdAndUpdate(hotel._id,hotel);
    }
    static async updatePlace(place){
        return Places.findByIdAndUpdate(place._id,place);
    }
    static async updateRestaurant(restaurant){
        return Restaurants.findByIdAndUpdate(restaurant._id,restaurant);
    }

};

export default AdminService;