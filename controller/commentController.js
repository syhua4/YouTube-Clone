import Video from "../models/Video";
import Comment from "../models/Comment";

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    req.user.comments.push(newComment.id);
    video.save();
    req.user.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  try {
    const {
      body: { commentId },
    } = req;
    const comment = await Comment.findByIdAndDelete(commentId);
    comment.save();
  } catch (err) {
    res.status(400);
  } finally {
    res.end();
  }
};
