$(function ()
{
	$('[data-toggle=tooltip]').tooltip();

    $('#form_step2').formValidation({
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
			sex:
			{
				validators:
				{
					notEmpty:
					{
						message: 'Le genre est requis'
					},
					blank: {}
				}
			},
			country:
			{
				validators:
				{
					notEmpty:
					{
						message: 'Le pays est requis'
					},
					blank: {}
				},
				onSuccess: function(e, data)
				{
					if(data.fv.isValidField('country')) $('#city').removeAttr('disabled');
					else $('#city').attr('disabled','disabled');

					$('#form_step2').formValidation('revalidateField','city');
				}
			},
			city:
			{
				validators:
				{
					notEmpty:
					{
						message: 'La ville / Code postal est requis'
					},
					blank: {}
				},
				onSuccess: function(e, data)
				{
					$('#form_step2').formValidation('enableFieldValidators','city_id',true);
				},
				onError: function(e, data)
				{
					$('#form_step2').formValidation('enableFieldValidators','city_id',false);
				}
			},
			city_id:
			{
				enabled: false,
				validators:
				{
					notEmpty:
					{
						message: 'La ville / Code postal est invalide'
					},
					blank: {}
				},
				onSuccess: function(e, data)
				{
					$('#form_step2').formValidation('enableFieldValidators','city',true);
					$('#city_form').removeClass("has-error");
					$('#city_form').addClass("has-success");
				},
				onError: function(e, data)
				{
					$('#form_step2').formValidation('enableFieldValidators','city',false);
					$('#city_form').removeClass("has-success");
					$('#city_form').addClass("has-error");
				}
			},
			day:
			{
				validators:
				{
					notEmpty:
					{
						message: 'Le jour de naissance est requis'
					},
					blank: {}
				}
			},
			month:
			{
				validators:
				{
					notEmpty:
					{
						message: 'Le mois de naissance est requis'
					},
					blank: {}
				}
			},
			year:
			{
				validators:
				{
					notEmpty:
					{
						message: 'L\'année de naissance est requise'
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
			url: '/ajax/registration/process_step2.html',
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
				// Reload la page pour afficher la prochaine étape du formulaire
				window.location = '/';

				/*
				$('.registration-box').fadeToggle(200);

				// Load step 3 form
				$('.registration-box').load('/ajax/registration/load_form3.html');
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
	})

	.on('input keyup','[name="city"]', function()
	{
		$('#city_id').val('');
		$('#form_step2').formValidation('revalidateField','city');
		$('#form_step2').formValidation('revalidateField','city_id');
		$('#city_form').addClass("has-error");
		$('#city_form').removeClass("has-success");
	});

	$('#city').autocomplete({
		source: function (request,response)
		{
			var objData;
			var label;

			if($(this.element).attr('id') == 'city') objData = { search: $('#city').val(), country: $('#country').val() };

			$.ajax({
				url: '/ajax/registration/get_cities.html',
				dataType: 'json',
				data: objData,
				type: 'GET',

				success: function (data)
				{
					response($.map(data, function (item)
					{
						if(item.ville != undefined) label = item.ville;
						else label = 'Aucun résultat trouvé';

						return {
							label: label,
							value: function ()
							{
								if($(this).attr('id') == 'city' && label != 'Aucun résultat trouvé')
								{
									$('#city').val(item.ville);
									$('#city_id').val(item.id);

									$('#form_step2').formValidation('revalidateField','city');
									$('#form_step2').formValidation('revalidateField','city_id');

									$('#city_form').removeClass("has-error");
									$('#city_form').addClass("has-success");

									return item.ville;
								}

								else
								{
									$('#city').val('');
									$('#city_id').val('');

									$('#form_step2').formValidation('revalidateField','city');
									$('#form_step2').formValidation('revalidateField','city_id');

									$('#city_form').removeClass("has-success");
									$('#city_form').addClass("has-error");

									return '';
								}
							}
						}
					}));
				}
			});
		},
		minLength: 3,
		delay: 200
	});
});

function resetCity()
{
	$('#city').val('');
	$('#city_id').val('');

	$('#form_step2').formValidation('revalidateField','city');
	$('#form_step2').formValidation('revalidateField','city_id');
}