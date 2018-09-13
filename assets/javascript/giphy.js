// on page load, run the script
$(document).ready(function () {

  var buttonPresets = ["Guitar", "Bass", "Drums"];

  // preset buttons
  for (var i = 0; i < buttonPresets.length; i++) {
    var pButton = $("<button>");
    pButton.attr({ "data-gif": buttonPresets[i], "class": "gif-button" });
    pButton.text(buttonPresets[i]);
    $("#gif-buttons").append(pButton);
  };

  // dynamically add buttons in response to user input
  $("#add").on("click", function () {
    event.preventDefault();
    var newButton = $("#new-button").val().trim();
    var uButton = $("<button>")
    uButton.attr({ "data-gif": newButton, "class": "gif-button" });
    uButton.text(newButton);
    $("#gif-buttons").append(uButton);
  });

  $(document).on('click', '.gif-button', function () {

    var buttonKey = $(this).attr("data-gif");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonKey + "&limit=3&offset=0&rating=G&lang=en&api_key=2xfMpJncr9W7kUV9H6FwTD1Q7hjjbrPb";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function (response) {
        console.log(queryURL);
        console.log(this); // Not grabbing dynamically created buttons
        console.log("button key: " + buttonKey);
        console.log("response: " + response);
        console.log("url: " + queryURL);

        var results = response.data;

        for (var k = 0; k < results.length; k++) {
          var q = results[k];
          var qStill = q.images.fixed_height_still.url;
          var qAnimate = q.images.fixed_height.url;
          // var dataState = "animate";

          var gifDiv = $("<div>");
          var p = $("<p>").text("Rating: " + q.rating);
          // var gifImg = $(`<img class='spiffy-gif' src='${qAnimate}' data-animate='${qAnimate}' data-still='${qStill}'`);

          var gifImg = $("<img class='spiffy-gif'>");

          gifImg.attr({ "src": qAnimate, "data-state": "animate", "data-animate": qAnimate, "data-still": qStill });

          gifDiv.append(p);
          gifDiv.append(gifImg);

          $("#gifs").prepend(gifDiv);

        }

      });

  });

});

$(document).on("click", ".spiffy-gif", function () {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});