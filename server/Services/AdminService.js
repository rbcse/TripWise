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

    static async addImgReligiousPlacesGallery(religiousPlaceId, imageUrl) {
        return ReligiousPlace.findByIdAndUpdate(
            religiousPlaceId,
            { $push: { image_gallery: imageUrl } }
        );
    }
    static async addImgPlacesGallery(placeId, imageUrl) {
        return Places.findByIdAndUpdate(
            placeId,
            { $push: { image_gallery: imageUrl } }
        );
    }
    static async addImgHotelsGallery(hotelId, imageUrl) {
        return Hotels.findByIdAndUpdate(
            hotelId,
            { $push: { image_gallery: imageUrl } }
        );
    }
    static async addImgRestaurantsGallery(restaurantId, imageUrl) {
        return Restaurants.findByIdAndUpdate(
            restaurantId,
            { $push: { image_gallery: imageUrl } }
        );
    }

};

export default AdminService;