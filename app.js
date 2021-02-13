/* getting the express module from the node_modules folder */
require("dotenv").config();

import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import { localMiddlewares } from "./middleware";
import "./passport";
import apiRouter from "./routers/apiRouter";

const app = express();
const cookieStore = MongoStore(session);

console.log(process.env.COOKIE_SECRET);
app.use(helmet());
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new cookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localMiddlewares);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.video, videoRouter);
app.use(routes.api, apiRouter);

export default app;
