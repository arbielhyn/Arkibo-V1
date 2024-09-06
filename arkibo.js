function validate(event) {
    hideErrors();

    if (formHasErrors()) {
        event.preventDefault();
        return false;
    }

    return true;
}

function resetForm(e) {
    e.preventDefault();
    if (confirm('Clear order?')) {
        document.getElementById("contactForm").reset();
        hideErrors();
        document.getElementById("fname").focus();
        return true;
    }
    return false;
}

function formHasErrors() {
    let errorFlag = false;

    let requiredFields = ["fname", "lname", "phone", "email"];

    for (let i = 0; i < requiredFields.length; i++) {
        let field = document.getElementById(requiredFields[i]);
        if (!formFieldHasInput(field)) {
            document.getElementById(requiredFields[i] + "_error").style.display = "block";
            if (!errorFlag) {
                field.focus();
                field.select();
            }
            errorFlag = true;
        } 
    }

    let phoneField = document.getElementById("phone");
    let phoneValue = phoneField.value;
    let phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    if (!phoneRegex.test(phoneValue)) {
        document.getElementById("phone_error").style.display = "block";
        if (!errorFlag) {
            phoneField.focus();
            phoneField.select();
        }
        errorFlag = true;
    } 
	

    let emailField = document.getElementById("email");
    let emailValue = emailField.value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        document.getElementById("email_error").style.display = "block";
        if (!errorFlag) {
            emailField.focus();
            emailField.select();
        }
        errorFlag = true;
    }

    return errorFlag;
}

function formFieldHasInput(field) {
	if (field.value == null || field.value == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;

}

function hideErrors() {
    let errorElements = document.querySelectorAll('.error');
    for (let i = 0; i < errorElements.length; i++) {
        errorElements[i].style.display = 'none';
}
}

function load() {
    hideErrors();
    document.getElementById('contactForm').addEventListener("submit", validate);
    document.getElementById("clear").addEventListener("click", resetForm);
}

document.addEventListener('DOMContentLoaded', load);
