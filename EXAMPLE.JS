<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.wpcf7');
    if (!form) return; // Ieșim dacă nu găsim formularul

    // Identificăm dropdown-ul principal
    const mainDropdown = form.querySelector('select[name="categoria-principala"]');
    // Identificăm container-ul cu toate grupurile condiționale
    const conditionalWrapper = form.querySelector('.grupuri-conditionale-wrapper');

    if (!mainDropdown || !conditionalWrapper) return; // Ieșim dacă elementele cheie lipsesc

    // Funcția care resetează un câmp
    function resetField(field) {
        const type = field.type;
        const tag = field.tagName.toLowerCase();

        if (tag === 'select') {
            // Pentru dropdown-uri, selectăm prima opțiune
            field.selectedIndex = 0;
        } else if (type === 'checkbox' || type === 'radio') {
            // Pentru checkbox-uri și butoane radio, le debifăm
            field.checked = false;
        } else if (tag === 'textarea' || type === 'text' || type === 'email' || type === 'tel' || type === 'number') {
            // Pentru câmpuri de text, le golim
            field.value = '';
        }
    }

    // Adăugăm "ascultătorul" pe dropdown-ul principal
    mainDropdown.addEventListener('change', function() {
        // Găsim TOATE câmpurile (input, select, textarea) din interiorul wrapper-ului
        const fieldsToReset = conditionalWrapper.querySelectorAll('input, select, textarea');
        
        // Trecem prin fiecare câmp găsit și îl resetăm
        fieldsToReset.forEach(resetField);
    });
});
</script>
