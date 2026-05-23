// js/features/contact-validation.js

function initContactValidation() {

    const contactForm = document.getElementById("contact-form");
    const contactName = document.getElementById("contact-name");
    const contactEmail = document.getElementById("contact-email");
    const contactMessage = document.getElementById("contact-message");
    const formMessage = document.getElementById("form-message");
    const cancelBtn = document.getElementById("form-cancel");

    if (!contactForm || !contactName || !contactEmail || !contactMessage || !formMessage) {
        console.warn("Contact form elements not found");
        return;
    }

    // EMAILJS INIT
    emailjs.init("TerlAUNV1GEJ1m-hp");

    // FORM SUBMIT
    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const message = contactMessage.value.trim();

        // RESET MESSAGE
        formMessage.textContent = "";
        formMessage.className = "text-sm text-center font-medium min-h-[1.25rem]";

        // NAME VALIDATION
        if (name === "") {
            showError("⚠️ Name is required", contactName);
            return;
        }

        if (name.length < 3) {
            showError("⚠️ Name must be at least 3 characters", contactName);
            return;
        }

        // EMAIL VALIDATION
        if (email === "") {
            showError("⚠️ Email is required", contactEmail);
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showError("⚠️ Enter a valid email address", contactEmail);
            return;
        }

        // MESSAGE VALIDATION
        if (message === "") {
            showError("⚠️ Message cannot be empty", contactMessage);
            return;
        }

        if (message.length < 10) {
            showError("⚠️ Message must be at least 10 characters", contactMessage);
            return;
        }

        // LOADING MESSAGE
        formMessage.textContent = "⏳ Sending message...";
        formMessage.classList.add("text-indigo-600");

        // SEND EMAIL
        emailjs.send("service_sf4hktm", "template_77yay0h", {

            from_name: name,
            from_email: email,
            message: message,
            to_email: "puneethm240@gmail.com"

        }).then(function () {

            // SUCCESS
            formMessage.textContent =
                "✅ Message sent successfully!";

            formMessage.classList.remove("text-indigo-600");

            formMessage.classList.add(
                "text-emerald-600",
                "dark:text-emerald-400"
            );

            contactForm.reset();

        }).catch(function (error) {

            console.error(error);

            // ERROR
            formMessage.textContent =
                "❌ Failed to send message. Try again.";

            formMessage.classList.remove("text-indigo-600");

            formMessage.classList.add("text-red-500");
        });

    });

    // CLEAR MESSAGE ON INPUT
    [contactName, contactEmail, contactMessage].forEach(input => {

        input.addEventListener("input", () => {
            formMessage.textContent = "";
        });

    });

    // CANCEL BUTTON
    if (cancelBtn) {

        cancelBtn.addEventListener("click", () => {

            contactForm.reset();
            formMessage.textContent = "";

        });
    }

    // ERROR FUNCTION
    function showError(msg, inputField) {

        formMessage.textContent = msg;

        formMessage.classList.add("text-red-500");

        inputField.focus();

        inputField.classList.add(
            "border-red-400",
            "ring-1",
            "ring-red-300"
        );

        setTimeout(() => {

            inputField.classList.remove(
                "border-red-400",
                "ring-1",
                "ring-red-300"
            );

        }, 2000);
    }
}