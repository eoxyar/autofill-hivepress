Autofill hivepress attributes from already made forms.
CREATE a new Add Listing template in HivePress>Templates.

<img width="1264" height="581" alt="image" src="https://github.com/user-attachments/assets/3c2cd6c5-3a51-45af-a750-b9c4899116cc" />

Instert your Shortcode and the Add listing Hivepress Form.
<img width="1265" height="442" alt="image" src="https://github.com/user-attachments/assets/220ab858-81db-4fb5-b4e9-cabd625648ce" />

This snippet, in wp admin side, will create settings>autofill hivepress tab, where can pair
Original Fields (ex: your-name) from an ex.CF7 form with HivePress Field (ex: nume), (slug of attribute)
and set the ex.CF7 form Field type (select, text, checkbox, (radio not work)). For Listings and Requests.

<img width="1264" height="638" alt="image" src="https://github.com/user-attachments/assets/02afefdd-b538-44ee-bd4e-4783da912878" />



The js will copy the selected value from the form to the paired hivepress field. 
Copy the main script in funtions.php of your theme, and copy the autofill-script.js into asstes/js/ folder.
<img width="1259" height="611" alt="image" src="https://github.com/user-attachments/assets/4ad9acb1-e1ab-4d8b-a9a5-66268752e747" />

Insert the EXAMPLE.JS code snippet in footer to control the form fields. The code reset to default option the conditional dropdown when user change the selection.
It is an example need to be adapted to your need. The form is in  CF7formexample.txt
 
To hide the hivepress fields use hide_hivepress_fields.txt codes in functions.php. You will replace the county_copy and city_copy with your attribute slug.

Of course you must create in HivePress your attributes, text type, you will pair them with the form fields.

Depending on the purpose, this script is helpful for FORM users, fans, of course with the limitation caused by the type of text attributes.


