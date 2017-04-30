for (var selector in config) {
  $(selector).chosen(config[selector]);
}

$("#submit").on("click", function(){

	function validateForm() {
	  var isValid = true;
	  $('.form-control').each(function() {
	    if ( $(this).val() === '' )
	        isValid = false;
	  });

	  $('.chosen-select').each(function() {

	  	if( $(this).val() === "")
	  		isValid = false
	  })
	  return isValid;
	}

	if (validateForm() == true)
	{

    	var userData = {
    		name: $("#name").val(),
    		photo: $("#photo").val(),
    		scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(), ]
    	}

    	var currentURL = window.location.origin;

    	$.post(currentURL + "/api/friends", userData, function(data){

    		$("#matchName").text(data.name);
    		$('#matchImg').attr("src", data.photo);

	    	$("#resultsModal").modal('toggle');

    	});
	}
	else
	{
		alert("Please fill out all fields before submitting!");
	}
	
	return false;
});


