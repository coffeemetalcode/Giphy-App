// on page load, run the script
$(document).ready(function () {

  var buttonPresets = ["Guitar", "Bass", "Drums", "Gorilla", "Banana", "Banana Guitar", "Jem", "Hurdy Gurdy", "Mask"];

  // preset buttons for all inexes in the buttonPresets array // this could be directed dynamically
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

  // Push gifs into DOM on a button click
  $(document).on('click', '.gif-button', function () {

    var buttonKey = $(this).attr("data-gif");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonKey + "&limit=5&offset=0&rating=G&lang=en&api_key=2xfMpJncr9W7kUV9H6FwTD1Q7hjjbrPb";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function (response) {
        console.log(queryURL);
        console.log(this);
        console.log("button key: " + buttonKey);
        console.log("response: " + response);
        console.log("url: " + queryURL);

        var results = response.data;

        // create urls for gifs based on search criteria and push them into the DOM
        for (var k = 0; k < results.length; k++) {
          var q = results[k]; // these three lines shorten subsequent variable calls
          var qStill = q.images.fixed_height_still.url;
          var qAnimate = q.images.fixed_height.url;

          var gifDiv = $("<div>"); // these three lines set up html elements for the DOM
          var p = $("<p>").text("Rating: " + q.rating);
          var gifImg = $("<img class='spiffy-gif'>");

          // add relevant attributes to the <img> tag
          gifImg.attr({ "src": qAnimate, "data-state": "animate", "data-animate": qAnimate, "data-still": qStill });

          // dynamically push gifs to the DOM
          gifDiv.append(p);
          gifDiv.append(gifImg);

          $("#gifs").prepend(gifDiv);

        }

      });

  });

});

//  stop and start animation in response to user clicks on gif images
$(document).on("click", ".spiffy-gif", function () {
  // I copied this section almost verbatim from the pausing-gifs activity
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});