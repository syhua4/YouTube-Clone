import express from "express";
import {
  postAddComment,
  postDeleteComment,
} from "../controller/commentController";
import { registerView } from "../controller/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);

export default apiRouter;
