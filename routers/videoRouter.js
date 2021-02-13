import express from "express";
import routes from "../routes";
import {
  deleteVideo,
  getEditVideo,
  getUploadVideo,
  postEditVideo,
  postUploadVideo,
  video,
  videoDetail,
} from "../controller/videoController";
import { privateRoutes, uploadVideoMiddleware } from "../middleware";

const videoRouter = express.Router();
videoRouter.get(routes.video, video);
videoRouter.get(routes.upload, privateRoutes, getUploadVideo);
videoRouter.post(
  routes.upload,
  privateRoutes,
  uploadVideoMiddleware,
  postUploadVideo
);
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
videoRouter.get(routes.deleteVideo(), deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
