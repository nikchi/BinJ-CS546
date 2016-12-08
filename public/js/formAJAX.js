(function ($, location, history) {
/*
	// variables for form page
	var myNewNoteForm = $("#new-note-form"),
		newTitleInput = $("#new-note-title"),
        newSummaryInput = $("#new-note-summary"),
		newDateInput = $("#new-note-dueDate"),
		newBodyInput = $("#new-note-body");
		
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
		
})(window.jQuery, window.location, window.history);