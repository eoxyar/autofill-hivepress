to # autofill-hivepress
Autofill hivepress attributes from already made forms.
CREATE a new Add Listing template in HivePress>Templates.

<img width="1264" height="581" alt="image" src="https://github.com/user-attachments/assets/3c2cd6c5-3a51-45af-a750-b9c4899116cc" />

Instert your Form Shortcode and than the Add listing Hivepress Form.
<img width="1265" height="442" alt="image" src="https://github.com/user-attachments/assets/220ab858-81db-4fb5-b4e9-cabd625648ce" />

This snippet, in wp admin side, will create settings>autofill hivepress tab, where can pair
Original Fields (ex: your-name) from an ex.CF7 form with HivePress Field (ex: nume), (slug of attribute)
and set the ex.CF7 form Field type (radio, select, text, checkbox).

<img width="1066" height="611" alt="image" src="https://github.com/user-attachments/assets/8f66cf8f-2bc4-48cd-96bc-88682230dd55" />


The js will copy the selected value from the form to paired hivepress field. 
Copy the main script in funtions.php of your theme, and copy the autofill-script.js into asstes/js/ folder.
<img width="1259" height="611" alt="image" src="https://github.com/user-attachments/assets/4ad9acb1-e1ab-4d8b-a9a5-66268752e747" />

Issue with the select type, when we switch to an earlier selected field of other conditional dropdown group,
will show the earler selected option not a default option, to force us to make a new selection. Need a click 
to on another option to activate the trigger. Need to improve with code to clear the group or set again to default value of dropdown when load,
forcing user to make a new click, activating the copy script or testing and finding wp form with default value option.




