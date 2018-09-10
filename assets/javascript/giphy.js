// on page load, run the script
$(document).ready(function () {
  var buttonPresets = ["Guitar", "Bass", "Drums"];

  for (var i = 0; i < buttonPresets.length; i++) {
    var pButton = $("<button>").text(buttonPresets[i]);
    $("#gif-buttons").append(pButton);
    console.log(buttonPresets.length);
  }

  $("#add").on("click", function () {
    event.preventDefault();
    var newButton = $("#new-button").val().trim();
    var uButton = $("<button>").text(newButton);
    $("#gif-buttons").append(uButton);
  });

});