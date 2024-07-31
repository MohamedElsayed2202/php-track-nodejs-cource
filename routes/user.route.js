import { Router } from "express";
import {
  getAllUsers,
  register,
  getUserById,
  updateUser,
  deleteUser,
  login,
  updateMyProfile,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

export const userRoute = Router();

userRoute.get("/", auth, getAllUsers);

userRoute.get("/:id", getUserById);

userRoute.post("/", register);

userRoute.post("/login", login);

userRoute.patch("/:id", updateUser);

userRoute.delete("/:id", deleteUser);

userRoute.put("/", auth , updateMyProfile)

// cors

// cors npm

// authintication login => create token => read token => validate token

// how to do authintication in express

// how to do cors middleware in express

// restfull apis
