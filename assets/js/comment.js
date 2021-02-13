import axios from "axios";

const commentForm = document.getElementsByClassName("comment__form")[0];
const commentList = document.getElementsByClassName("comment__list")[0];
const commentCount = document.getElementsByClassName("video__comment")[0];
const deleteCommentList = document.getElementsByClassName(
  "delete__comment"
);

const updateCommentCount = (commentTrigger) => {
  if (commentTrigger === "add") {
    commentCount.innerHTML = `${
      parseInt(commentCount.innerHTML, 10) + 1
    } Comments`;
  } else {
    commentCount.innerHTML = `${
      parseInt(commentCount.innerHTML, 10) - 1
    } Comments`;
  }
};

const addComment = (comment) => {
  const li = document.createElement("li");
  li.innerHTML = comment;
  commentList.prepend(li);
  updateCommentCount("add");
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/add`,
    method: "post",
    data: { comment },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const deleteComment = (commentId) => {
  const comment = document.getElementById(commentId);
  const commentLi = comment.parentNode.parentNode;
  commentLi.parentNode.removeChild(commentLi);
  updateCommentCount("delete");
};

const handleSubmit = (e) => {
  e.preventDefault();
  const myComment = document.getElementById("comment_text");
  sendComment(myComment.value);
  myComment.value = "";
};

const handleDelete = async (e) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "post",
    data: { commentId: e.target.id },
  });
  if (response.status === 200) {
    deleteComment(e.target.id);
  }
};

function init() {
  commentForm.addEventListener("submit", handleSubmit);
  for (let dom of deleteCommentList) {
    dom.addEventListener("click", handleDelete);
  }
}

if (commentForm) {
  init();
}
