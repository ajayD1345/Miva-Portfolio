// ===============================
// CONTACT FORM VALIDATION
// ===============================

const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");

// ===============================
// VALIDATION FUNCTIONS
// ===============================

function showError(input, errorElement, message) {

    input.parentElement.classList.remove("success");
    input.parentElement.classList.add("error");

    errorElement.textContent = message;

}

function showSuccess(input, errorElement) {

    input.parentElement.classList.remove("error");
    input.parentElement.classList.add("success");

    errorElement.textContent = "";

}

function validateName() {

    const value = nameInput.value.trim();

    if (value === "") {

        showError(nameInput, nameError, "Full name is required.");
        return false;

    }

    if (value.length < 3) {

        showError(nameInput, nameError, "Name must be at least 3 characters.");
        return false;

    }

    showSuccess(nameInput, nameError);

    return true;

}

function validateEmail() {

    const value = emailInput.value.trim();

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {

        showError(emailInput, emailError, "Email is required.");
        return false;

    }

    if (!emailRegex.test(value)) {

        showError(emailInput, emailError, "Enter a valid email address.");
        return false;

    }

    showSuccess(emailInput, emailError);

    return true;

}

function validateSubject() {

    const value = subjectInput.value.trim();

    if (value === "") {

        showError(subjectInput, subjectError, "Subject is required.");
        return false;

    }

    showSuccess(subjectInput, subjectError);

    return true;

}

function validateMessage() {

    const value = messageInput.value.trim();

    if (value === "") {

        showError(messageInput, messageError, "Message cannot be empty.");
        return false;

    }

    if (value.length < 10) {

        showError(messageInput, messageError, "Message is too short.");
        return false;

    }

    showSuccess(messageInput, messageError);

    return true;

}

// ===============================
// LIVE VALIDATION
// ===============================

nameInput.addEventListener("input", validateName);

emailInput.addEventListener("input", validateEmail);

subjectInput.addEventListener("input", validateSubject);

messageInput.addEventListener("input", validateMessage);

// ===============================
// FORM SUBMISSION
// ===============================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (

        isNameValid &&
        isEmailValid &&
        isSubjectValid &&
        isMessageValid

    ) {

        alert("✅ Thank you! Your message has been sent successfully.");

        form.reset();

        document.querySelectorAll(".input-box").forEach(box => {

            box.classList.remove("success");

        });

    }

});