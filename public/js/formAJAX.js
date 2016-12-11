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
        let template = "<hr><div class='review-box'><div class='counter'><a id='upvote'><i class='em em-clap'></i></a><p id='score'>" + "0" + "</p><a id='downvote'><i class='em em-poop'></i></a></div> <div class='review-body'><h2>" + title + "</h2><p> Rating: " + rating + "</p><p> Poster: " + "" + "</p><p> " + body + "</p></div></div></br>";
        $("div.reviews").append(template);
			});
		}
	});

	//variables for up/down voting elements
	var upVote = $(".upvote"),
		downVote = $(".downvote"),
		score = $(".score");
	

	upVote.click(function (event) {
		event.preventDefault();
	
		console.log("upvoted");
		var showName = newShowTitle.text();
		var me = $(this);
		var myId = me.attr('id');
		var myScore = $("#"+myId+".score");
		console.log(myId);
		
		var requestConfig = {
                method: "POST",
                url: "/shows/up",
                contentType: 'application/json',
                data: JSON.stringify({
					showName: showName,
					reviewId: myId
                })
            };
            $.ajax(requestConfig).then(function (responseMessage) {
				myScore.text(responseMessage.score);
            });

	});

	downVote.click(function (event) {
		event.preventDefault();

		console.log("downvoted");
		var showName = newShowTitle.text();
		var me = $(this);
		var myId = me.attr('id');
		var myScore = $("#"+myId+".score");
		console.log(myId);
		
		var requestConfig = {
                method: "POST",
                url: "/shows/down",
                contentType: 'application/json',
                data: JSON.stringify({
					showName: showName,
					reviewId: myId
                })
            };
            $.ajax(requestConfig).then(function (responseMessage) {
				
				myScore.text(responseMessage.score);
            });

	});

	

})(window.jQuery, window.location, window.history);
