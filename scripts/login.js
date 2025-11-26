const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

togglePassword.addEventListener('click', function() {
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;

    this.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

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

password.addEventListener('blur', function() {
    if (!validatePassword(this.value)) {
        this.classList.add('error');
        passwordError.classList.add('show');
    } else {
        this.classList.remove('error');
        passwordError.classList.remove('show');
    }
});

password.addEventListener('input', function() {
    if (this.classList.contains('error') && validatePassword(this.value)) {
        this.classList.remove('error');
        passwordError.classList.remove('show');
    }
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    email.classList.remove('error');
    password.classList.remove('error');
    emailError.classList.remove('show');
    passwordError.classList.remove('show');

    let isValid = true;

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

    if (isValid) {
        console.log('Login exitoso:', {
            email: email.value,
            remember: document.getElementById('remember').checked
        });

        alert('¡Inicio de sesión exitoso! Redirigiendo...');

        setTimeout(() => {
            window.location.href = 'index.html#booking';
        }, 1000);
    } else {
        const firstError = document.querySelector('.error');
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