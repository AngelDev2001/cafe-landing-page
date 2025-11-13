document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const people = document.getElementById('people');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const dateError = document.getElementById('dateError');
    const timeError = document.getElementById('timeError');
    const peopleError = document.getElementById('peopleError');
    const successMessage = document.getElementById('successMessage');

    let isValid = true;
    [name, email, date, time, people].forEach(field => {
        field.classList.remove('error');
    });
    [nameError, emailError, dateError, timeError, peopleError, successMessage].forEach(error => {
        error.classList.remove('show');
    });

    if (name.value.trim() === '') {
        name.classList.add('error');
        nameError.classList.add('show');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.classList.add('error');
        emailError.classList.add('show');
        isValid = false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date.value);

    if (date.value === '' || selectedDate < today) {
        date.classList.add('error');
        dateError.textContent = date.value === '' ? 'Por favor selecciona una fecha' : 'La fecha debe ser hoy o en el futuro';
        dateError.classList.add('show');
        isValid = false;
    }

    if (time.value === '') {
        time.classList.add('error');
        timeError.classList.add('show');
        isValid = false;
    }

    if (people.value === '') {
        people.classList.add('error');
        peopleError.classList.add('show');
        isValid = false;
    }

    if (isValid) {
        successMessage.classList.add('show');

        console.log('Reservation submitted:', {
            name: name.value,
            email: email.value,
            date: date.value,
            time: time.value,
            people: people.value
        });

        this.reset();

        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    } else {
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

document.getElementById('name').addEventListener('blur', function() {
    const nameError = document.getElementById('nameError');
    if (this.value.trim() === '') {
        this.classList.add('error');
        nameError.classList.add('show');
    } else {
        this.classList.remove('error');
        nameError.classList.remove('show');
    }
});

document.getElementById('email').addEventListener('blur', function() {
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.value)) {
        this.classList.add('error');
        emailError.classList.add('show');
    } else {
        this.classList.remove('error');
        emailError.classList.remove('show');
    }
});

document.getElementById('date').addEventListener('change', function() {
    const dateError = document.getElementById('dateError');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(this.value);

    if (this.value === '' || selectedDate < today) {
        this.classList.add('error');
        dateError.textContent = this.value === '' ? 'Por favor selecciona una fecha' : 'La fecha debe ser hoy o en el futuro';
        dateError.classList.add('show');
    } else {
        this.classList.remove('error');
        dateError.classList.remove('show');
    }
});

document.getElementById('time').addEventListener('change', function() {
    const timeError = document.getElementById('timeError');
    if (this.value === '') {
        this.classList.add('error');
        timeError.classList.add('show');
    } else {
        this.classList.remove('error');
        timeError.classList.remove('show');
    }
});

document.getElementById('people').addEventListener('change', function() {
    const peopleError = document.getElementById('peopleError');
    if (this.value === '') {
        this.classList.add('error');
        peopleError.classList.add('show');
    } else {
        this.classList.remove('error');
        peopleError.classList.remove('show');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});