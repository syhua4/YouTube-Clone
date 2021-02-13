const video = document.getElementById("jsVideo");

const updateViews = () => {
  let id = window.location.href.split("/videos/")[1];
  fetch(`/api/${id}/view`, { method: "POST" });
};
function init() {
  video.addEventListener("ended", updateViews);
}

if (video) {
  init();
}
