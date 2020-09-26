$(document).ready(() => {
  $.get("/api/likes", data => {
    console.log(data);
  });
});
