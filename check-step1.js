$(function ()
{
	$('[data-toggle=tooltip]').tooltip();

    $('#form_step1').formValidation({
		framework: 'bootstrap',
		icon:
		{
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded:	':disabled',
		live:		'enabled',
		verbose:	'false',
		fields:
		{
			login:
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
						message: 'Le pseudo est requis'
					},
					stringLength:
					{
						min: 4,
						max: 20,
						message: 'Le pseudo doit faire de 4 à 20 caractères'
					},
					regexp:
					{
						regexp: '^([A-Za-z0-9])([\._A-Za-z0-9-]+)([A-Za-z0-9])$',
						message: 'Le pseudo contient des caractères non autorisés'
					},
					remote:
					{
						url: '/ajax/registration/check_login.html',
						type: 'GET'
					},
					blank: {}
				}
			},
			email:
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
						url: '/ajax/registration/check_email.html',
						type: 'GET'
					},
					blank: {}
				}
			},
			password:
			{
				trigger: 'blur',

				transformer: function($field, validatorName, validator)
				{
					var value = $field.val();

					value = value.trim();
					value = value.toLowerCase();

					return value;
				},

				validators: {
					notEmpty: {
						message: 'Le mot de passe est requis'
					},
					stringLength: {
						min: 4,
						max: 20,
						message: 'Le mot de passe doit faire de 4 à 20 caractères'
					},
					blank: {}
				}
			},
			password2:
			{
				trigger: 'blur',

				transformer: function($field, validatorName, validator)
				{
					var value = $field.val();

					value = value.trim();
					value = value.toLowerCase();

					return value;
				},

				validators: {
					notEmpty: {
						message: 'La confirmation est requise'
					},
					identical: {
						field: 'password',
						message: 'Le mot de passe doit être identique'
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
			url: '/ajax/registration/process_step1.html',
			method: 'POST',
			data: $form.serialize(),
			dataType: 'json'
		}).success(function(response)
		{
			// If there is error returned from server
			if(response.result === 'error')
			{
				for(var field in response.fields) fv.updateMessage(field, 'blank', response.fields[field]).updateStatus(field, 'INVALID', 'blank');

				if(response.custom_error)
				{
					$('#form_step1 .custom-error').html(response.custom_error);
					$('#form_step1 .custom-error').show();
				}
			}

			else
			{
				// Reload la page pour afficher la prochaine étape du formulaire
				window.location = '/';

				/*
				$('.registration-box').fadeToggle(200);

				// Load step 2 form
				$('.registration-box').load('/ajax/registration/load_form2.html?ajax=1');
				$('.registration-box').fadeToggle(200);
				*/
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