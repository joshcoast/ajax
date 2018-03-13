	// API key 9f58bbritTrBuLoXySdYbj0bEcMXMWB5
	// https://developers.giphy.com/explorer/

	// url https://api.giphy.com/v1/gifs/search?api_key=9f58bbritTrBuLoXySdYbj0bEcMXMWB5&q=Gimli&limit=25&offset=0&rating=R&lang=en


var buttons = ["Gimli", "Eye of Mordor", "Rosie Cotton", "Elrond", "Peregrin Took"];

$(document).ready(function () {
	// reuse element queries
	var $buttonArea = $("#buttonArea");

	//event listeners 
	$("#addButton").on("click", function(event){
		gifalizer.addNewButton();
	});

	var gifalizer = {
		createButtons: function() {
			for (var i = 0; i < buttons.length; i++) {
				console.log(buttons[i]);
				var buttonElement = `
					<button type="button" class="btn btn-primary"> 
						${buttons[i]} 
					</button>`;
					$("#buttonArea").append(buttonElement);
			}
		},
		addNewButton: function() {
			event.preventDefault(event);
			console.log("you clicked add-a-button");
		}
	}

	gifalizer.createButtons();
	

	$buttonArea.on("click", "button", function (event) {
		event.preventDefault(event);
		console.log("you clicked a button in the button area");
		var searchTerm = $(this).text();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			searchTerm + "&api_key=9f58bbritTrBuLoXySdYbj0bEcMXMWB5&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {

			console.log(response);
			var results = response.data;
			var $gifsArea = $("#gifs-appear-here")
			for (var i = 0; i < results.length; i++) {
				var gifDiv = $('<div class="col-md-4">');
				var p = $('<p>');
				p.text(results[i].rating);
				var animalImage = $("<img>");
				animalImage.attr("src", results[i].images.fixed_height.url);
				gifDiv.append(p);
				gifDiv.append(animalImage);
				$gifsArea.prepend(gifDiv);
			}
		});
	});








});//end doc ready