import UserService from "../Services/UserServices.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const createUser = async (req , res) => {
    try {
        const isUserPresent = await UserService.findUserByEmail(req.body.email);
        if(isUserPresent){
            return res.status(200).json({success : false , message : 'User already exists'});
        }
        else{
            const hashedPassword = await bcrypt.hash(req.body.password,10);
            const userDetails = {
                'name' : req.body.name , 
                'email' : req.body.email,
                'password' : hashedPassword,
                'image' : req.body.image
            }
            const user = await UserService.createUser(userDetails);
            return res.status(200).json({success : true , message : 'Signup successful! Redirecting...'});
        }
    } catch (error) {
        return res.status(400).json({success : false , message : error});
    }
}

const userLogin = async (req , res) => {
    try {
        const isUserPresent = await UserService.findUserByEmail(req.body.email);
        if(!isUserPresent){
            return res.status(200).json({success : false , message : 'User does not exist'});
        }
        else{
            const matchPassword = await bcrypt.compare(req.body.password , isUserPresent.password);
            if(!matchPassword){
                return res.status(200).json({success : false , message : 'Invalid Password'});
            }
            else{
                const token = jwt.sign({
                    email : req.body.email,
                    id : isUserPresent._id,
                    name : isUserPresent.name ,
                    picture : isUserPresent.image
                } , process.env.JWT_SECRET);
                return res.status(200).json({success : true , message : 'Login Successfully , Redirecting ...' , token : token});
            }
        }
    } catch (error) {
        return res.status(400).json({success : false , message : error});
    }
}

const userFeedback = async (req,res) => {
    try {
        const result = await UserService.submitFeedback(req.body);
        if(result){
            return res.status(200).json({success : true , message : "Feedback submitted"});
        }
        else{
            return res.status(200).json({success : false , message : "Something went wrong, try again"});
        }
    } catch (error) {
        return res.status(400).json({success : false , message : error});
    }
}

export {createUser , userLogin , userFeedback};