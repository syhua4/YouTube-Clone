import express from "express";
import routes from "../routes";
import {
  getChangePassword,
  getEditProfile,
  postChangePassword,
  postEditProfile,
  userDetail,
  users,
} from "../controller/userController";
import { privateRoutes, uploadAvatarMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.users, users);

userRouter.get(routes.editProfile, privateRoutes, getEditProfile);
userRouter.post(
  routes.editProfile,
  privateRoutes,
  uploadAvatarMiddleware,
  postEditProfile
);

userRouter.get(routes.changePassword, privateRoutes, getChangePassword);
userRouter.post(routes.changePassword, privateRoutes, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
