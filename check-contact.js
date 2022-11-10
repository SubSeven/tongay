charLimitation(2000,'#message-counter','#address');

$(function ()
{
    $('#form-contact').formValidation({
		framework: 'bootstrap',
		icon: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded:	':disabled',
		live:		'disabled',
		verbose:	'false',
		fields:
		{
			postcode:
			{
				trigger: 'blur',

				transformer: function($field, validatorName, validator)
				{
					var value = $field.val();
					return value.trim();
				},
				validators:
				{
					notEmpty:
					{
						message: 'L\'adresse email est requise'
					},
					regexp:
					{
						regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
						message: 'L\'adresse email est incorrecte'
					},
					remote:
					{
						url: '/ajax/contact/check_email.html',
						type: 'GET'
					},
					blank: {}
				}
			},
			address: {
				trigger: 'blur',

				transformer: function($field, validatorName, validator)
				{
					var value = $field.val();
					return value.trim();
				},
				validators: {
					notEmpty: {
						message: 'Le message est requis'
					},
					stringLength: {
						min: 50,
						max: 2000,
						message: 'Le message doit contenir entre 50 et 2000 caractères'
					},
					blank: {}
				}
			}
		}
	})

	.on('success.form.fv', function(e)
	{
		// Prevent default form submission
		e.preventDefault();

		var $form = $(e.target),                    // The form instance
		fv = $form.data('formValidation');   // FormValidation instance

		// Send data to back-end
		$.ajax({
			url: '/ajax/contact/process.html',
			method: 'POST',
			data: $form.serialize(),
			dataType: 'json'
		}).success(function(response)
		{
			// If there is error returned from server
			if(response.result === 'error')
			{
				for(var field in response.fields) fv.updateMessage(field, 'blank', response.fields[field]).updateStatus(field, 'INVALID', 'blank');
			}

			else
			{
				$('#form-recover').fadeToggle(200);

				// Load success page
				$('#form-recover').load('/ajax/contact/load_success.html?ajax=1');
				$('#form-recover').fadeToggle(200);
			}
		});
	})

	.on('err.validator.fv', function(e, data)
	{
		// $(e.target)    --> The field element
		// data.fv        --> The FormValidation instance
		// data.field     --> The field name
		// data.element   --> The field element
		// data.validator --> The current validator name

		data.element
			.data('fv.messages')
			// Hide all the messages
			.find('.help-block[data-fv-for="' + data.field + '"]').hide()
			// Show only message associated with current validator
			.filter('[data-fv-validator="' + data.validator + '"]').show();
	})

	.on('err.field.fv', function(e, data)
	{
		// Enable the submit button all time
		data.fv.disableSubmitButtons(false);
	})

	.on('success.field.fv', function(e, data)
	{
		// Enable the submit button all time
		data.fv.disableSubmitButtons(false);
	});
});

function charLimitation(limit,counterId,elementId)
{
	$(counterId).text('0 / 2000');

	$(elementId).keyup(function ()
	{
		left = limit - $(this).val().length;

		if(left < 0)
		{
			$(counterId).addClass("overlimit");
			$(elementId + '_container').addClass("has-error");
			$('#submit').attr("disabled",true);
		}

		else
		{
			$(counterId).removeClass("overlimit");
			$(elementId + '_container').removeClass("has-error");
			$('#submit').attr("disabled",false);
		}

		$(counterId).text($(this).val().length + ' / ' + limit);
	});
}