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

  function reflection(saveReflection) {
    $(".submit").on("click", () => {
      saveReflection = $(".submit").val();
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
    // clear input box
    $(".submit").val("");
    // clear any old content
    $("#comment_text").empty();
    reflection();
  });
});
