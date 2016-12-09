(function ($, location, history) {

	//variables for review-form elements
	var newReviewForm = $("#review-submit"),
		newTitle = $("#review-title"),
		newBody = $("#review-body"),
		newRating = $("#review-rating"),
		newShowTitle = $("#title");


	newReviewForm.submit(function (event) {
		event.preventDefault();

		var title = newTitle.val();
		var body = newBody.val();
		var rating = parseInt(newRating.val());
		var showTitle = newShowTitle.text();
		console.log(title + " " + body + " " + rating + " " + showTitle);

		if (title && body && rating) {
			var requestConfig = {
				method: "POST",
				url: "/shows",
				contentType: 'application/json',
				data: JSON.stringify({
					showName: showTitle, 
					title: title,
					body: body,
					rating: rating
				})
			};

			$.ajax(requestConfig).then(function (responseMessage) {
        //TODO change if poster is established
        let template = "<hr><div class='review-box'><div class='counter'><a id='upvote'><i class='em em-clap'></i></a><p id='score'>" + rating + "</p><a id='downvote'><i class='em em-poop'></i></a></div> <div class='review-body'><h2>" + title + "</h2><p> Rating: " + rating + "</p><p> Poster: " + "" + "</p><p> " + body + "</p></div></div></br>";
        $("div.reviews").append(template);
			});
		}
	});

	//variables for up/down voting elements
	var upVote = $("#upvote"),
		downVote = $("#downvote"),
		counter = $("#score");
	

	upVote.click(function (event) {
		event.preventDefault();
		


	});

})(window.jQuery, window.location, window.history);
/*
		
	// variables for single page
	var nextNoteLink = $("#next-note-link"),
		noteTitle = $("#note-title"),
		noteSummary = $("#note-summary"),
		noteDate = $("#note-dueDate"),
		noteBody = $("#note-body");	
	
	myNewNoteForm.submit(function (event) {
		event.preventDefault();
		
		var newTitle = newTitleInput.val();
        var newSummary = newSummaryInput.val();
        var newDate = newDateInput.val();
		var newBody = newBodyInput.val();
		
		//console.log("submit clicked");

        if (newTitle && newSummary && newDate && newBody) {
			//console.log("all elements found");
            var requestConfig = {
                method: "POST",
                url: "/",
                contentType: 'application/json',
                data: JSON.stringify({
                    title: newTitle,
					dueDate: newDate,
                    summary: newSummary,
					body: newBody
                })
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                //console.log(responseMessage.newId);
				window.location = "/" + responseMessage.newId;
                //newContent.html(responseMessage.message);
                //                alert("Data Saved: " + msg);
            });
        }
	});
	
	nextNoteLink.click(function (event) {
		event.preventDefault();
		let pathname = location.pathname;
		let pathInt = parseInt(pathname.slice(1));
		var requestConfig = {
                method: "POST",
                url: "/next",
                contentType: 'application/json',
                data: JSON.stringify({
					lastId: pathInt
                })
            };
            $.ajax(requestConfig).then(function (responseMessage) {
				history.pushState({}, "next", responseMessage.note.id);
				noteTitle.text(responseMessage.note.title);
				noteDate.text(responseMessage.note.dueDate);
				noteSummary.text(responseMessage.note.summary);
				noteBody.text(responseMessage.note.body);
            });
		
	});
*/
	
