const { getQuote, getImage } = require("./api_js");
const history = [];

$(document).ready(() => {
  function setStage() {
    $(".quote").html(
      "<style> background-image: url('" + getQuote() + "');</style>"
    );
    $(".backg").html(
      "<style> background-image: url('" + getImage() + "');</style>"
    );
  }

  function reflection(){
    $(".submit").on("click", () => {
      let saveReflection = $(".submit").val();
      history.push(saveReflection);
      setStage();
    });
  }

  $(".dislike").on("click", () => {
    setStage();
    // clear input box
    $(".submit").val("");
    // clear any old content
    $("#comment_text").empty();
  });

  $(".heart").on("click", () => {
    reflection();
    // clear input box
    $(".submit").val("");
    // clear any old content
    $("#comment_text").empty();
  });
});
