const saveReflection = null;

$(document).ready(() => {
  function reflection() {
    $(".submit").on("click", () => {
      saveReflection = $(".submit")
        .val()
        .trim();
      $.post("/api/likes", saveReflection);
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
