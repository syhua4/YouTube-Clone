import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import {
  facebookLogin,
  facebookPostLogin,
  getJoin,
  getlogin,
  githubLogin,
  githubLoginCbSuccess,
  logout,
  myProfile,
  postJoin,
  postlogin,
} from "../controller/userController";
import { privateRoutes, publicRoutes } from "../middleware";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, publicRoutes, getJoin);
globalRouter.post(routes.join, publicRoutes, postJoin, postlogin);

globalRouter.get(routes.login, publicRoutes, getlogin);
globalRouter.post(routes.login, publicRoutes, postlogin);

globalRouter.get(routes.githubAuth, githubLogin);

globalRouter.get(
  routes.githubAuthCb,
  passport.authenticate("github", {
    failureRedirect: routes.login,
  }),
  githubLoginCbSuccess
);

globalRouter.get(routes.facebookAuth, facebookLogin);

globalRouter.get(routes.facebookAuthCb, facebookPostLogin);

globalRouter.get(routes.logout, privateRoutes, logout);
globalRouter.get(routes.search, search);
globalRouter.get(routes.me, myProfile);

export default globalRouter;
