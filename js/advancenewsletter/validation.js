Validation.addAllThese([

 ['validate-cemail', 'Please make sure your emails match.', function(v) {
var conf = $$('.validate-cemail')[0];
var pass = false;
if ($('email')) {
pass = $('email');
}
var emailElements = $$('.validate-email');
for (var i = 0; i < emailElements.size(); i++) {
var emailElement = emailElements[i];
if (emailElement.up('form').id == conf.up('form').id) {
pass = emailElement;
}
}
if ($$('.validate-admin-email').size()) {
pass = $$('.validate-admin-email')[0];
}
return (pass.value == conf.value);
}],
]); 


