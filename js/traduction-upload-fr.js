/*!
 * FileInput French Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-fileinput
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
    "use strict";

    $.fn.fileinputLocales['fr'] = {
        fileSingle: 'fichier',
        filePlural: 'fichiers',
        browseLabel: 'Parcourir&hellip;',
        removeLabel: 'Supprimer',
        removeTitle: 'Supprimer les fichiers sélectionnés',
        cancelLabel: 'Annuler',
        cancelTitle: "Annuler l'envoi en cours",
        uploadLabel: 'Transférer',
        uploadTitle: 'Transférer les fichiers sélectionnés',
        msgNo: 'Non',
        msgNoFilesSelected: '',
        msgCancelled: 'Annulé',
        msgZoomModalHeading: 'Aperçu détaillé',
        msgSizeTooSmall: 'Le fichier "{name}" (<b>{size}</b> KB) est trop petit, la taille doit être supérieure à <b>{minSize} KB</b>.',
        msgSizeTooLarge: 'Le fichier "{name}" (<b>{size}</b> KB) dépasse la taille maximale autorisée de <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'Vous devez sélectionner au moins <b>{n}</b> {files} à ajouter.',
        msgFilesTooMany: 'Vous ne pouvez pas ajouter plus de <b>{m}</b> images.',
        msgFileNotFound: 'Le fichier "{name}" est introuvable !',
        msgFileSecured: "Des restrictions de sécurité vous empêchent d'accéder au fichier \"{name}\".",
        msgFileNotReadable: 'Le fichier "{name}" est illisible.',
        msgFilePreviewAborted: 'Prévisualisation du fichier "{name}" annulée.',
        msgFilePreviewError: 'Une erreur est survenue lors de la lecture du fichier "{name}".',
        msgInvalidFileName: 'Caractères invalides ou non-supportés dans le fichier "{name}".',
        msgInvalidFileType: 'Le fichier "{name}" n\'est pas autorisé. Seuls les fichiers de type "{types}" sont autorisés.',
        msgInvalidFileExtension: 'Seules les extensions "{extensions}" sont autorisées.',
        msgFileTypes: {
            'image': 'image',
            'html': 'HTML',
            'text': 'text',
            'video': 'video',
            'audio': 'audio',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'object'
        },
        msgUploadAborted: 'Le téléchargement du fichier a été interrompu.',
        msgUploadThreshold: 'En cours de traitement ...',
        msgUploadBegin: 'Initialisation ...',
        msgUploadEnd: 'Terminé',
        msgUploadEmpty: 'Aucune donnée valide n\'a été trouvée pour le transfer.',
        msgValidationError: 'Erreur de validation',
        msgLoading: 'Transmission du fichier {index} sur {files}&hellip;',
        msgProgress: 'Transmission du fichier {index} sur {files} - {name} - {percent}% terminée.',
        msgSelected: '{n} {files} sélectionné(s)',
        msgFoldersNotAllowed: 'Glissez et déposez uniquement des fichiers ! {n} répertoire(s) exclu(s).',
        msgImageWidthSmall: 'La largeur de fichier image "{name}" doit être d\'au moins {size} px.',
        msgImageHeightSmall: 'La hauteur de fichier image "{name}" doit être d\'au moins {size} px.',
        msgImageWidthLarge: 'La largeur de fichier image "{name}" ne peut pas dépasser {size} px.',
        msgImageHeightLarge: 'La hauteur de fichier image "{name}" ne peut pas dépasser {size} px.',
        msgImageResizeError: "Impossible d'obtenir les dimensions de l'image à redimensionner.",
        msgImageResizeException: "Erreur lors du redimensionnement de l'image.<pre>{errors}</pre>",
        msgAjaxError: 'Une erreur est survenue pendant le traitement {operation}. Merci de ressayer !',
        msgAjaxProgressError: '{operation} failed',
        ajaxOperations: {
            deleteThumb: 'file delete',
            uploadThumb: 'file upload',
            uploadBatch: 'batch file upload',
            uploadExtra: 'form data upload'
        },
        dropZoneTitle: 'Glissez et déposez les fichiers ici&hellip;',
        dropZoneClickTitle: '<br>(or click to select {files})',
        fileActionSettings: {
            removeTitle: 'Supprimer le fichier',
            uploadTitle: 'Télécharger un fichier',
            zoomTitle: 'Voir les détails',
            dragTitle: 'Déplacer / Réarranger',
            indicatorNewTitle: 'Pas encore téléchargé',
            indicatorSuccessTitle: 'Posté',
            indicatorErrorTitle: 'Ajouter erreur',
            indicatorLoadingTitle: 'Ajout ...'
        },
        previewZoomButtonTitles: {
            prev: 'Voir le fichier précédent',
            next: 'Voir le fichier suivant',
            toggleheader: 'Afficher avec ou sans entête',
            fullscreen: 'Afficher en plein écran',
            borderless: 'Afficher avec ou sans bordure',
            close: 'Fermer l\'aperçu'
        }
    };
})(window.jQuery);