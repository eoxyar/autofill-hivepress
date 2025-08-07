# autofill-hivepress
Autofill hivepress attributes from already made forms.
CREATE a new Add Listing template in HivePress>Templates.
Instert your Form Shortcode and than the Add listing Hivepress Form.
This snippet, in wp admin side, will create settings>autofill hivepress tab, where can pair
Original Fields (ex: your-name) from an ex.CF7 form with HivePress Field (ex: nume), (slug of attribute)
and set the ex.CF7 form Field type (radio, select, text, checkbox). 
The js will copy the 
selected value from the form to paired hivepress field. 
Copy the main script in funtions.php of your theme, and copy the autofill-script.js into asstes/js/ folder.
Issue with the select type, when we switch to an earlier selected field of other conditional dropdown group,
will show the earler selected option not a default option, to force us to make a new selection. Need a click 
to on another option to activate the trigger. The checkbox and text type fileds works OK.




