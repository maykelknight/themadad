$("#submitBtn").click(function (e) {
    e.preventDefault();

	var validationError = "Coś poszło nie tak! Proszę wypełnić wszystkie obowiązkowe pola.";
	var successMessage = "Dziękujemy! Twoja wiadomość została pomyślnie dostarczona.";
	var errorMessage = "Wystąpił problem z wysłaniem wiadomości przez formularz.";

	var errorWrapper = $('.w-form-fail');
	var successWrapper = $('.w-form-done');

    var name = $("#form-name").val();
    var email = $("#form-email").val();
    var text = $("#form-text").val();

	errorWrapper.css("display", "none");
	successWrapper.css("display", "none");

	if(name === "" || email === "" || text === "") {
		$('.error-text-block').text(validationError);
		errorWrapper.css("display", "block");
		errorWrapper.css("margin-top", "10px");
		return;
	} else {
		errorWrapper.css("display", "none");
	}

    $.post("mailer.php", {
      name: name,
      email: email,
	  text: text,
    }).done(function(data) {
		$('#email-form')[0].reset();
		$('.success-text-block').text(successMessage);
		successWrapper.css("display", "block");
		successWrapper.css("margin-top", "10px");
	}).fail(function(data, textStatus, xhr) {
		$('.error-text-block').text(errorMessage);
		errorWrapper.css("display", "block");
		errorWrapper.css("margin-top", "10px");
		console.error("error", data.responseText);
	});
 });
