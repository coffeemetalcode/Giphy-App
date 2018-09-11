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

  $(".gif-button").on("click", function () {

    var buttonKey = $(this).attr("data-gif");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonKey + "&limit=10&offset=0&rating=G&lang=en&api_key=2xfMpJncr9W7kUV9H6FwTD1Q7hjjbrPb";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function (response) {
        // console.log(queryURL);
        // console.log(this); // Not grabbing dynamically created buttons
        console.log(response);
        console.log(queryURL);

        var results = response.data;
      });

  });

});

