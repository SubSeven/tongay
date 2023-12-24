$(function ()
{
    $('#form-signin').formValidation({
		framework: 'bootstrap',
		icon:
		{
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded:	':disabled',
		live:		'disabled',
		verbose:	'false',
		fields:
		{
			signin_login:
			{
				transformer: function($field, validatorName, validator)
				{
					var value = $field.val();

					return value.trim();
				},
				validators:
				{
					notEmpty:
					{
						message: 'Le pseudo ou l\'email est requis'
					},
					blank: {}
				}
			},
			signin_password:
			{
				transformer: function($field, validatorName, validator)
				{
					var value = $field.val();

					value = value.trim();
					value = value.toLowerCase();

					return value;
				},
				validators:
				{
					notEmpty:
					{
						message: 'Le mot de passe est requis'
					},
					blank: {}
				}
			}
		}
	})

	.on('success.form.fv', function(e)
	{
		// Désactive le bouton
		//$('.button-submit').prop('disabled', true);

		// Prevent default form submission
		e.preventDefault();

		// Hide custom error message
		$('#form-signin .custom-error').hide();

		var $form = $(e.target),                    // The form instance
		fv = $form.data('formValidation');   // FormValidation instance

		// Send data to back-end
		$.ajax({
			url: '/ajax/process_signin.html',
			method: 'POST',
			data: $form.serialize(),
			dataType: 'json'
		}).success(function(response)
		{
			// Si le membre est exilé
			if(response.result === 'exiled') window.location.href = '/verification-majorite.html';

			// If there is error returned from server
			else if(response.result === 'error')
			{
				for (var field in response.fields) fv.updateMessage(field, 'blank', response.fields[field]).updateStatus(field, 'INVALID', 'blank');

				if (response.custom_error)
				{
					$('#form-signin .custom-error').html(response.custom_error);
					$('#form-signin .custom-error').show();
				}
			}

			else window.location.href = '/membre/?user=' + response.userId;

			/*
			setTimeout(function()
	        {
				// Réactive le bouton
				$('.button-submit').prop('disabled', false);
	        }, 3000);
	        */
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
		//data.fv.disableSubmitButtons(false);
	})

	.on('success.field.fv', function(e, data)
	{
		// Enable the submit button all time
		//data.fv.disableSubmitButtons(false);
	});
});