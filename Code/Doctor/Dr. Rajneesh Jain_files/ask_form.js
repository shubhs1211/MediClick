$(function() {
	$('#ask_phone').focus(function(){
		$('#phone-no-info').css('margin-top','25px');
		$('#phone-no-info').show();
	});
	$('#ask_phone').blur(function(){
		$('#phone-no-info').hide();
	});

	$('.ask-me-form .submit').click(function() {
		var message = '';
		var error = false;
		var ask_name = $('.ask-me-form #ask_name').val();
		var ask_email = $('.ask-me-form #ask_email').val();
		var ask_phone = $('.ask-me-form #ask_phone').val();
		var ask_message = $('.ask-me-form #ask_message').val();
		var submit_url = $(this).attr('data-url');
		var submit_doctor_id = $(this).attr('data-doctor-id');

		if (!ask_name) {
			error = true;
			message = message + 'Name is required.';
			$('.ask-me-form #ask_name').addClass('error');
		}
		else {
			$('.ask-me-form #ask_name').removeClass('error');
		}

		if (!ask_email) {
			error = true;
			message = message + 'Email is required.';
			$('.ask-me-form #ask_email').addClass('error');
		}
		else {
			$('.ask-me-form #ask_email').removeClass('error');
		}

		if (!validateEmail(ask_email)) {
			error = true;
			message = message + 'Email is not valid.';
			$('.ask-me-form #ask_email').addClass('error');
		}
		else {
			$('.ask-me-form #ask_email').removeClass('error');
		}

		if (!ask_phone) {
			error = true;
			message = message + 'Phone is required.';
			$('.ask-me-form #ask_phone').addClass('error');
		}
		else {
			$('.ask-me-form #ask_phone').removeClass('error');
		}

		if (!validatePhone(ask_phone)) {
			error = true;
			message = message + 'Phone is not valid.';
			$('.ask-me-form #ask_phone').addClass('error');
		}
		else {
			$('.ask-me-form #ask_phone').removeClass('error');
		}

		if (!ask_message) {
			error = true;
			message = message + 'Message is required.';
			$('.ask-me-form #ask_message').addClass('error');
		}
		else {
			$('.ask-me-form #ask_message').removeClass('error');
		}




		//submit values
		if (error) {
			//alert(message);
		}
		else {
			$.ajax({
				type: "POST",
				url: submit_url,
				data: { ask_name: ask_name, ask_email: ask_email, ask_phone: ask_phone, ask_message: ask_message, 'ask_did': submit_doctor_id },
			}).done(function( msg ) {
					$('.ask-me-form #ask_name').val('');
					$('.ask-me-form #ask_email').val('');
					$('.ask-me-form #ask_phone').val('');
					$('.ask-me-form #ask_message').val('');
					alert('We have received your query, and shall get back to you shortly.');
				//$('.ask-me-form').html(msg);
			});
		}

	});

	/* Validating the email address. */
	function validateEmail(email) {
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		var address = email;
		if(reg.test(address) == false) {
			return false;
		}
		else {
			return true;
		}
	}

	function validatePhone(phone) {
		if ( phone.length != 10 || !$.isNumeric(phone))  {
			return false;
		}
		return true;
	}


});