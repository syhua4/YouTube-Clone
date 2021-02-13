require("dotenv").config();

import passport from "passport";
import githubStrategy from "passport-github";
import facebookStrategy from "passport-facebook";
import {
  facebookLoginCb,
  githubLoginCb,
} from "./controller/userController";

import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `http://localhost:4000${routes.githubAuthCb}`,
    },
    githubLoginCb
  )
);

passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: `http://localhost:4000${routes.facebookAuthCb}`,
    },
    facebookLoginCb
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
