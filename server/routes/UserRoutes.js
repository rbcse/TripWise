import express from 'express';
import { createUser , userLogin , userFeedback } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post("/signup",createUser);
userRouter.post("/login",userLogin);
userRouter.post("/feedback",userFeedback);

export default userRouter;