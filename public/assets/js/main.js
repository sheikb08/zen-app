$(document).ready(() => {
  function reflection(saveReflection) {
    $(".submit").on("click", () => {
      saveReflection = $("#comment_text")
        .val()
        .trim();
      console.log(saveReflection);
      $.post("/api/likes", {
        quoteId: saveReflection
      });
    });
  }

  $(".dislike").on("click", () => {
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
