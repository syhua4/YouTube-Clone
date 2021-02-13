import routes from "./routes";
import multer from "multer";

const uploadVideo = multer({ dest: "uploads/videos/" });
const uploadAvatar = multer({ dest: "uploads/avatars/" });

export const localMiddlewares = (req, res, next) => {
  res.locals.siteName = "YouTube Clone";
  res.locals.routes = routes;
  res.locals.user = req.user || {};
  next();
};

export const uploadVideoMiddleware = uploadVideo.single("upload");
export const uploadAvatarMiddleware = uploadAvatar.single("avatar");

export const publicRoutes = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const privateRoutes = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.login);
  } else {
    next();
  }
};
