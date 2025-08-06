jQuery(document).ready(function($) {
    // Verificăm dacă obiectul 'autofill_data' a fost trimis de PHP
    if (typeof autofill_data === 'undefined' || typeof autofill_data.mappings === 'undefined' || autofill_data.mappings.length === 0) {
        console.log('Autofill HivePress: Nu s-au găsit mapări de câmpuri.');
        return;
    }

    console.log('--- Autofill HivePress Script Încărcat ---');
    console.log('Mapări de procesat:', autofill_data.mappings);

    /**
     * Funcție care copiază valoarea pe baza unei mapări.
     * @param {object} mapping - Obiectul care conține {original, copy, type}
     */
    function copyFieldValue(mapping) {
        // Construim selectorii DINAMIC pe baza numelor din setări
        const sourceName = mapping.original;
        const destinationName = mapping.copy;

        // Selectorul pentru elementul sursă (formularul original)
        const $sourceElement = $('[name="' + sourceName + '"], [name="' + sourceName + '[]"]');
        
        // Selectorul pentru elementul destinație (formularul HivePress)
        const $destinationElement = $('[name="' + destinationName + '"]');

        if (!$sourceElement.length || !$destinationElement.length) {
            return; // Ieșim silențios dacă un câmp nu e pe pagină
        }

        let valueToCopy = '';

        // Determinăm valoarea de copiat în funcție de tipul câmpului sursă
        switch (mapping.type) {
            case 'select':
                valueToCopy = $sourceElement.find('option:selected').text();
                break;
            
            case 'radio':
                valueToCopy = $sourceElement.filter(':checked').val();
                break;
            
            case 'checkbox':
                // Colectează valorile de la toate checkbox-urile bifate cu același nume
                valueToCopy = $sourceElement.filter(':checked').map(function() {
                    return $(this).val();
                }).get().join(', '); // Le unim cu virgulă dacă sunt mai multe
                break;
            
            case 'text':
            default: // Pentru input[type=text], textarea, etc.
                valueToCopy = $sourceElement.val();
                break;
        }

        // Prevenim valoarea 'undefined'
        if (typeof valueToCopy === 'undefined') {
            valueToCopy = '';
        }

        // Atribuim valoarea câmpului destinație
        $destinationElement.val(valueToCopy).trigger('change'); // Adăugăm .trigger('change') pentru compatibilitate
        console.log(`Autofill: Am copiat "${valueToCopy}" din [name="${sourceName}"] în [name="${destinationName}"]`);
    }

    // Iterăm prin fiecare mapare primită de la PHP
    autofill_data.mappings.forEach(function(mapping) {
        // Construim selectorul sursă pentru a atașa evenimentul
        const sourceSelector = '[name="' + mapping.original + '"], [name="' + mapping.original + '[]"]';

        // Atașăm event listener-ul pe document pentru a prinde și elementele dinamice
        $(document).on('input change', sourceSelector, function() {
            copyFieldValue(mapping);
        });
    });

    // Efectuăm o copiere inițială la încărcarea paginii, pentru câmpuri pre-completate
    setTimeout(function() {
        console.log('--- Autofill: Se efectuează copierea inițială ---');
        autofill_data.mappings.forEach(function(mapping) {
            copyFieldValue(mapping);
        });
    }, 500); // Delay pentru a permite altor script-uri să se încarce
});
