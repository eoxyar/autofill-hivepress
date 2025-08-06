// Adaugă pagină de setări în admin
add_action('admin_menu', function () {
    add_options_page(
        'Autofill HivePress',
        'Autofill HivePress',
        'manage_options',
        'autofill-hivepress',
        'autofill_hivepress_settings_page'
    );
});

// Înregistrează setarea
add_action('admin_init', function () {
    register_setting('autofill_hivepress_settings', 'autofill_hivepress_field_mappings');
});

function autofill_hivepress_settings_page() {
    $mappings = get_option('autofill_hivepress_field_mappings', []);
    ?>
    <div class="wrap">
        <h1>Autofill HivePress</h1>
        <form method="post" action="options.php">
            <?php settings_fields('autofill_hivepress_settings'); ?>
            <table class="form-table" id="autofill-mapping-table">
                <tr>
                    <th>Original Field (ex: your-name)</th>
                    <th>HivePress Field (ex: nume)</th>
                    <th>Field Type</th>
                    <th></th>
                </tr>
                <?php foreach ((array) $mappings as $index => $row): ?>
                <tr>
                    <td><input name="autofill_hivepress_field_mappings[<?php echo $index ?>][original]" type="text" value="<?php echo esc_attr($row['original']) ?>"></td>
                    <td><input name="autofill_hivepress_field_mappings[<?php echo $index ?>][copy]" type="text" value="<?php echo esc_attr($row['copy']) ?>"></td>
                    <td>
                        <select name="autofill_hivepress_field_mappings[<?php echo $index ?>][type]">
                            <option value="text" <?php selected($row['type'], 'text') ?>>Text</option>
                            <option value="radio" <?php selected($row['type'], 'radio') ?>>Radio</option>
                            <option value="checkbox" <?php selected($row['type'], 'checkbox') ?>>Checkbox</option>
                            <option value="select" <?php selected($row['type'], 'select') ?>>Select</option>
                        </select>
                    </td>
                    <td><button class="button remove-row" type="button">X</button></td>
                </tr>
                <?php endforeach; ?>
            </table>
            <p><button id="add-row" class="button" type="button">Adaugă rând</button></p>
            <?php submit_button(); ?>
        </form>
    </div>

    <script>
    document.getElementById('add-row').addEventListener('click', function () {
        const table = document.getElementById('autofill-mapping-table');
        const index = table.rows.length - 1;
        const row = table.insertRow();
        row.innerHTML = `
            <td><input name="autofill_hivepress_field_mappings[${index}][original]" type="text"></td>
            <td><input name="autofill_hivepress_field_mappings[${index}][copy]" type="text"></td>
            <td>
                <select name="autofill_hivepress_field_mappings[${index}][type]">
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="select">Select</option>
                </select>
            </td>
            <td><button class="button remove-row" type="button">X</button></td>
        `;
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-row')) {
            e.target.closest('tr').remove();
        }
    });
    </script>
    <?php
}



// Încarcă script-ul pe frontend și trimite datele din setări
add_action('wp_enqueue_scripts', function () {
    // 1. Preluăm mapările salvate în pagina de setări
    $mappings = get_option('autofill_hivepress_field_mappings', []);

    // 2. Oprim procesul dacă nu există nicio mapare definită
    if (empty($mappings)) {
        return;
    }

    // 3. Înregistrăm și încărcăm fișierul nostru JavaScript
    //    Asigură-te că calea este corectă! Aici presupun că se află în /assets/js/
    wp_enqueue_script(
        'autofill-hivepress-script',
        get_template_directory_uri() . '/assets/js/autofill-script.js', // Schimbă calea dacă e necesar
        ['jquery'],
        '1.0',
        true
    );

    // 4. Trimitem datele (mapările) către scriptul nostru folosind wp_localize_script
    //    Acesta va crea un obiect JavaScript numit `autofill_data`
    wp_localize_script(
        'autofill-hivepress-script',
        'autofill_data',
        [
            'mappings' => array_values($mappings) // Trimitem mapările ca un array curat
        ]
    );
});
