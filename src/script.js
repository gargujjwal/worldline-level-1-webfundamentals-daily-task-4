const form = document.getElementById("registrationForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");
const submitButton = form.querySelector('button[type="submit"]');
const buttonTooltip = document.querySelector(".button-tooltip");

// Regular expressions for validation
const patterns = {
  fullName: /^[A-Za-z\s]{3,}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phone: /^\d{10}$/,
};

// Show error message
function showError(input, message) {
  const errorDiv = input.parentElement.querySelector(".error-message");
  errorDiv.textContent = message;
}

// Clear error message
function clearError(input) {
  const errorDiv = input.parentElement.querySelector(".error-message");
  errorDiv.textContent = "";
}

// Validate single field
function validateField(input, pattern) {
  if (!pattern.test(input.value)) {
    showError(input, `Invalid ${input.name}`);
    return false;
  }
  clearError(input);
  return true;
}

// Password strength checker
function checkPasswordStrength(password) {
  const strengthDiv = document.querySelector(".password-strength");
  if (password.length < 8) {
    strengthDiv.textContent = "Weak";
    strengthDiv.className = "password-strength weak";
  } else if (password.length < 12) {
    strengthDiv.textContent = "Moderate";
    strengthDiv.className = "password-strength moderate";
  } else {
    strengthDiv.textContent = "Strong";
    strengthDiv.className = "password-strength strong";
  }
}

// Email validation message
emailInput.addEventListener("keyup", function () {
  const validationDiv = this.parentElement.querySelector(".validation-message");
  if (patterns.email.test(this.value)) {
    validationDiv.textContent = "Valid email";
    validationDiv.className = "validation-message valid-message";
  } else {
    validationDiv.textContent = "Invalid email";
    validationDiv.className = "validation-message invalid-message";
  }
});

// Password strength indicator
passwordInput.addEventListener("keyup", function () {
  checkPasswordStrength(this.value);
});

// Password tooltip
const passwordTooltip = document.querySelector(".tooltip");
passwordInput.addEventListener("mouseover", () => {
  passwordTooltip.style.display = "block";
});

passwordInput.addEventListener("mouseout", () => {
  passwordTooltip.style.display = "none";
});

// Submit button hover effects
submitButton.addEventListener("mouseover", function (e) {
  const isValid =
    validateField(fullNameInput, patterns.fullName) &&
    validateField(emailInput, patterns.email) &&
    validateField(passwordInput, patterns.password) &&
    validateField(phoneInput, patterns.phone);

  if (!isValid) {
    buttonTooltip.style.display = "block";
    buttonTooltip.style.left = e.pageX + 10 + "px";
    buttonTooltip.style.top = e.pageY + 10 + "px";
  }
});

submitButton.addEventListener("mouseout", () => {
  buttonTooltip.style.display = "none";
});

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid =
    validateField(fullNameInput, patterns.fullName) &&
    validateField(emailInput, patterns.email) &&
    validateField(passwordInput, patterns.password) &&
    validateField(phoneInput, patterns.phone);

  if (isValid) {
    alert("Form submitted successfully!");
    form.reset();
  }
});
