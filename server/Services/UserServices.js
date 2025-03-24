import User from "../models/UserModel.js";
import Feedback from "../models/FeedbackModel.js";

class UserService{
    static async createUser(userData) {
        return await User.create(userData);
    }

    static async getAllUsers(){
        return await User.find();
    }

    static async findUserByEmail(email) {
        try {
            return await User.findOne({ email }); 
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error("Database error occurred while fetching user.");
        }
    }

    static async submitFeedback(feedback){
        return await Feedback.create(feedback);
    }
    
}

export default UserService;