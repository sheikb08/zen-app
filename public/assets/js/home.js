$(document).ready(() => {
  function reflection(saveReflection) {
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
    // clear input box
    $(".submit").val("");
    // clear any old content
    $("#comment_text").empty();
    reflection();
  });
});
