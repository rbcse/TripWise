import express from "express";
import { getAllPlaces , getAllHotels , createTrip , getUserTrips, addUserPlaces , removePlaces , fetchTripPlacesById , addUserHotels , removeHotels , fetchTripHotelsById , getAllRestaurants , addUserRestaurants , removeRestaurant , fetchTripRestaurantsById , getAllUserTrips , cancelTrip } from "../controllers/TripController.js";

const tripRouter = express.Router();

tripRouter.get("/all-places",getAllPlaces);
tripRouter.get("/all-hotels",getAllHotels);
tripRouter.post("/add-destination",createTrip);
tripRouter.post("/get-user-trips",getUserTrips);
tripRouter.post("/add-place",addUserPlaces);
tripRouter.post("/remove-place",removePlaces);
tripRouter.get("/:tripId/places",fetchTripPlacesById);
tripRouter.post("/add-hotel",addUserHotels);
tripRouter.post("/remove-hotel",removeHotels);
tripRouter.get("/:tripId/hotels",fetchTripHotelsById);
tripRouter.get("/all-restaurants",getAllRestaurants);
tripRouter.post("/add-restaurant",addUserRestaurants);
tripRouter.post("/remove-restaurant",removeRestaurant);
tripRouter.get("/:tripId/restaurants",fetchTripRestaurantsById);
tripRouter.post("/user-trips",getAllUserTrips);
tripRouter.post("/cancel-trip",cancelTrip);

export default tripRouter;