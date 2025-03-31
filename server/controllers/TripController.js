import Places from "../models/PlaceModel.js";
import Trip from "../models/TripModel.js";
import TripService from "../Services/TripService.js";

const getAllPlaces = async (req , res) => {
    try {
        const result = await TripService.findAllPlaces();
        if(result){
            return res.status(200).json({success : true , places : result});
        }
        else{
            return res.status(404).json({success : false , error: "Places not found"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error: error});
    }
}

const getAllHotels = async (req , res) => {
    try {
        const result = await TripService.findAllHotels();
        if(result){
            return res.status(200).json({success : true , hotels : result});
        }
        else{
            return res.status(404).json({success : false , error: "Hotels not found"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error: error});
    }
}

const getAllRestaurants = async (req , res) => {
    try {
        const result = await TripService.findAllRestaurants();
        if(result){
            return res.status(200).json({success : true , restaurants : result});
        }
        else{
            return res.status(404).json({success : false , error: "Hotels not found"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error: error});
    }
}

const createTrip = async (req,res) => {
    try {
        const result = await TripService.createTrip(req.body);
        if(result){
            return res.status(200).json({success : true});  
        }
        else{
            return res.status(200).json({success : false , error: "Something went wrong"}); 
        }
    } catch (error) {
        return res.status(400).json({success : false , error: error}); 
    }
}

const getUserTrips = async (req,res) => {
    try {
        const result = await TripService.getUserTrips(req.body.user_id);
        if(result){
            return res.status(200).json({success : true , userTrips : result});   
        }
        else{
            return res.status(200).json({success : false , error : "Something went wrong"});  
        }
    } catch (error) {
        return res.status(400).json({success : false , error: error}); 
    }
}

const addUserPlaces = async (req,res) => {
    try {
        const result = await TripService.addUserTripPlaces(req.body.trip_id , req.body.place);
        if(result){
            return res.status(200).json({success : true});
        }
        else{
            return res.status(200).json({success : false , error : "Something went wrong"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error : error});
    }
}

const removePlaces = async(req,res) => {
    try {
        const result = await TripService.removeUserTripPlace(req.body.trip_id , req.body.place);
        if(result){
            return res.status(200).json({success : true});
        }
        else{
            return res.status(200).json({success : false , error : "Something went wrong"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error : error});
    }
}

const fetchTripPlacesById = async(req,res) => {
    try {
        const {tripId} = req.params;
        const trip = await Trip.findById(tripId);
        return res.json({ places: trip?.places || [] });
    } catch (error) {
        return res.json({error : error});
    }
}

const addUserHotels = async (req,res) => {
    try {
        const result = await TripService.addUserTripHotels(req.body.trip_id , req.body.hotel);
        if(result){
            return res.status(200).json({success : true});
        }
        else{
            return res.status(200).json({success : false , error : "Something went wrong"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error : error});
    }
}

const removeHotels = async(req,res) => {
    try {
        const result = await TripService.removeUserTripHotel(req.body.trip_id , req.body.hotel);
        if(result){
            return res.status(200).json({success : true});
        }
        else{
            return res.status(200).json({success : false , error : "Something went wrong"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error : error});
    }
}

const fetchTripHotelsById = async(req,res) => {
    try {
        const {tripId} = req.params;
        const trip = await Trip.findById(tripId);
        return res.json({ hotels: trip?.hotels || [] });
    } catch (error) {
        return res.json({error : error});
    }
}

const addUserRestaurants = async (req,res) => {
    try {
        const result = await TripService.addUserTripRestaurant(req.body.trip_id , req.body.restaurant);
        if(result){
            return res.status(200).json({success : true});
        }
        else{
            return res.status(200).json({success : false , error : "Something went wrong"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error : error});
    }
}

const removeRestaurant = async(req,res) => {
    try {
        const result = await TripService.removeUserTripRestaurant(req.body.trip_id , req.body.restaurant);
        if(result){
            return res.status(200).json({success : true});
        }
        else{
            return res.status(200).json({success : false , error : "Something went wrong"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error : error});
    }
}

const fetchTripRestaurantsById = async(req,res) => {
    try {
        const {tripId} = req.params;
        const trip = await Trip.findById(tripId);
        return res.json({ restaurants: trip?.restaurants || [] });
    } catch (error) {
        return res.json({error : error});
    }
}

const getAllUserTrips = async (req,res) => {
    try {
        const result = await TripService.getTripsForUser(req.body.user_id);
        if(result){
            return res.status(200).json({success : true , userTrips : result});
        }
        else{
            return res.status(404).json({success : false , error : "Something went wrong"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error: error});
    }
}

const cancelTrip = async (req,res) => {
    try {
        const result = await TripService.deleteTrip(req.body.tripId);
        if(result){
            return res.status(200).json({success : true});
        }
        else{
            return res.status(404).json({success : false , error : "Something went wrong"});
        }
    } catch (error) {
        return res.status(400).json({success : false , error: error});
    }
}

const setTripSequence = async(req,res) => {
    try {
        const result = await TripService.addTripSequence(req.body.tripId , req.body.tripSequence);
        if(result){
            return res.status(200).json({success : true});
        }
        else{
            return res.status(404).json({success : false , error : "Something went wrong in adding trip Sequence"});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({success : false , error: error});
    }
}

export {getAllPlaces , getAllHotels , createTrip , getUserTrips , addUserPlaces , removePlaces , fetchTripPlacesById , addUserHotels , removeHotels , fetchTripHotelsById , getAllRestaurants , addUserRestaurants , removeRestaurant , fetchTripRestaurantsById , getAllUserTrips , cancelTrip , setTripSequence};