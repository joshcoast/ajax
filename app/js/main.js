// https://developers.giphy.com/explorer/

$(document).ready(function () {

	var buttons = ["Frodo Baggins", "Samwise Gamgee", "Gimli", "Aragorn", "Legolas", "Gandalf", "Boromir", "Eye of Mordor", "Sauron", "Gimli's Axe", "Rosie Cotton", "Elrond", "Peregrin Took", "Mariadoc Brandybuck", "Tom Bombadil", "Radagast", "Fangorn", "Treebeard", "Gollum"];
	var $buttonArea = $("#buttonArea");

	//event listeners 
	$("#addButton").on("click", function (event) {
		gifalizer.addNewButton();
	});

	var gifalizer = {
		createButtons: function () {
			$buttonArea.empty();
			for (var i = 0; i < buttons.length; i++) {
				var buttonElement = `
					<button type="button" class="btn btn-outline-secondary mb-2"> 
						${buttons[i]} 
					</button>`;
				$buttonArea.append(buttonElement);
			}
		},
		addNewButton: function () {
			event.preventDefault(event);
			var gifInput = $("#gif-input").val().trim();
			$("#gif-input").val("");
			buttons.push(gifInput);
			gifalizer.createButtons();
		},
	}
	gifalizer.createButtons();

	$buttonArea.on("click", "button", function (event) {
		event.preventDefault(event);
		var searchTerm = $(this).text();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			searchTerm + "&api_key=9f58bbritTrBuLoXySdYbj0bEcMXMWB5&limit=10";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
			console.log(response);
			var results = response.data;
			for (var i = 0; i < results.length; i++) {
				$("#gifs-appear-here").prepend(
					`<div class="col-md-4">
						<div class="card mb-4 gif-card">
							<div class="card-image-wrap">
								<img class="card-img-top" data-altImage="${results[i].images.original.url}" src="${results[i].images.fixed_height_still.url}" alt="${results[i].title}">
								<i class="play-icon far fa-play-circle"></i>
							</div>
							<div class="card-body">
								<p class="card-text">Title: ${results[i].title}</p>
								<div class="d-flex justify-content-between align-items-center">
									<div class="btn-group">
										<a role="button" class="btn btn-sm btn-outline-secondary" href="${results[i].images.fixed_width.url}" target="_blank">View</a>
										<button type="button" class="btn btn-sm btn-outline-secondary" data-gifLink="${results[i].images.fixed_width.url}" data-toggle="tooltip" data-placement="right" title="Copy Link">
											<i class="fas fa-link fa-spin"></i>
										</button>
									</div>
									<small class="text-muted">Gif Rating: ${results[i].rating}</small>
                </div>
							</div>
						</div>
					</div>`
				);
				$('[data-toggle="tooltip"]').tooltip();
			}
		});
	});

	//Switch still and animated
	$("#gifs-appear-here").on("click", ".gif-card img", function () {
		var $thisGif = $(this);
		imgAlt = $thisGif.attr("data-altImage");
		imgSrc = $thisGif.attr("src");
		$thisGif.attr("src", imgAlt).attr("data-altImage", imgSrc);
		$thisGif.parent().toggleClass("play");
	});

	//Copy Gif link to clipboard
	$("#gifs-appear-here").on("click", "[data-gifLink]", function (event) {
		event.preventDefault(event);
		var $thisLink = $(this);
		var dummyContent = $thisLink.attr("data-gifLink");
		console.log(dummyContent);
		var dummy = $('<input>');
		dummy.val(dummyContent);
		dummy.appendTo('#copyInputs').select();
		document.execCommand('copy');

		$(this).tooltip('hide')
		.attr('data-original-title', "Link Copied!")
		.tooltip('show');

	});


}); //end doc ready