const registerForm = document.getElementById('registerForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const terms = document.getElementById('terms');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const termsError = document.getElementById('termsError');

const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const passwordStrength = document.getElementById('passwordStrength');

togglePassword.addEventListener('click', function() {
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;
    this.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

toggleConfirmPassword.addEventListener('click', function() {
    const type = confirmPassword.type === 'password' ? 'text' : 'password';
    confirmPassword.type = type;
    this.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

function validateName(name) {
    return name.trim().length >= 3 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function checkPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    return strength;
}

function updatePasswordStrength(strength) {
    const strengthBar = passwordStrength.querySelector('.strength-bar');
    passwordStrength.classList.add('show');

    strengthBar.classList.remove('weak', 'medium', 'strong');

    if (strength <= 2) {
        strengthBar.classList.add('weak');
    } else if (strength <= 3) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
}

name.addEventListener('blur', function() {
    if (!validateName(this.value)) {
        this.classList.add('error');
        nameError.classList.add('show');
    } else {
        this.classList.remove('error');
        nameError.classList.remove('show');
    }
});

name.addEventListener('input', function() {
    if (this.classList.contains('error') && validateName(this.value)) {
        this.classList.remove('error');
        nameError.classList.remove('show');
    }
});

email.addEventListener('blur', function() {
    if (!validateEmail(this.value)) {
        this.classList.add('error');
        emailError.classList.add('show');
    } else {
        this.classList.remove('error');
        emailError.classList.remove('show');
    }
});

email.addEventListener('input', function() {
    if (this.classList.contains('error') && validateEmail(this.value)) {
        this.classList.remove('error');
        emailError.classList.remove('show');
    }
});

password.addEventListener('input', function() {
    const strength = checkPasswordStrength(this.value);

    if (this.value.length > 0) {
        updatePasswordStrength(strength);
    } else {
        passwordStrength.classList.remove('show');
    }

    if (this.classList.contains('error') && validatePassword(this.value)) {
        this.classList.remove('error');
        passwordError.classList.remove('show');
    }

    if (confirmPassword.value.length > 0) {
        if (this.value === confirmPassword.value) {
            confirmPassword.classList.remove('error');
            confirmPasswordError.classList.remove('show');
        } else {
            confirmPassword.classList.add('error');
            confirmPasswordError.classList.add('show');
        }
    }
});

password.addEventListener('blur', function() {
    if (!validatePassword(this.value)) {
        this.classList.add('error');
        passwordError.classList.add('show');
    } else {
        this.classList.remove('error');
        passwordError.classList.remove('show');
    }
});

confirmPassword.addEventListener('input', function() {
    if (this.value === password.value) {
        this.classList.remove('error');
        confirmPasswordError.classList.remove('show');
    } else {
        this.classList.add('error');
        confirmPasswordError.classList.add('show');
    }
});

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    name.classList.remove('error');
    email.classList.remove('error');
    password.classList.remove('error');
    confirmPassword.classList.remove('error');
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    passwordError.classList.remove('show');
    confirmPasswordError.classList.remove('show');
    termsError.classList.remove('show');

    let isValid = true;

    if (!validateName(name.value)) {
        name.classList.add('error');
        nameError.classList.add('show');
        isValid = false;
    }

    if (!validateEmail(email.value)) {
        email.classList.add('error');
        emailError.classList.add('show');
        isValid = false;
    }

    if (!validatePassword(password.value)) {
        password.classList.add('error');
        passwordError.classList.add('show');
        isValid = false;
    }

    if (password.value !== confirmPassword.value) {
        confirmPassword.classList.add('error');
        confirmPasswordError.classList.add('show');
        isValid = false;
    }

    if (!terms.checked) {
        termsError.classList.add('show');
        isValid = false;
    }

    if (isValid) {
        console.log('Registro exitoso:', {
            name: name.value,
            email: email.value,
            phone: phone.value,
            termsAccepted: terms.checked
        });

        alert('¡Cuenta creada exitosamente! Redirigiendo al login...');

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    } else {
        const firstError = document.querySelector('.error, .error-message.show');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

window.addEventListener('load', function() {
    document.querySelector('.auth-container').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.auth-container').style.transition = 'opacity 0.5s';
        document.querySelector('.auth-container').style.opacity = '1';
    }, 100);
});