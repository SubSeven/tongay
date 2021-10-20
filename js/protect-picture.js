$(function()
{
	// Désactive le menu contextuel sur les images
	$('body').on('contextmenu', '.protect-picture img', function(e)
	{
		e.preventDefault();
	});

	// Désactive le déplacement des images du membre
	$('body').on('dragstart', '.protect-picture img', function(e)
	{
		e.preventDefault();
	});

	// Désactive le menu contextuel sur les images
	$('body').on('contextmenu', '.protect-picture img', function(e)
	{
		e.preventDefault();
	});

	// Désactive le déplacement des images du membre
	$('body').on('dragstart', '.protect-picture img', function(e)
	{
		e.preventDefault();
	});
});