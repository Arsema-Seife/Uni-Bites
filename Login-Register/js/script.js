// =======================
// THEME TOGGLE
// =======================
const themeSwitch = document.getElementById('themeSwitch');

if (themeSwitch) {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem(
            'theme',
            document.body.classList.contains('dark-mode') ? 'dark' : 'light'
        );
    });
}

// =======================
// LOGIN / REGISTER TOGGLE
// =======================
const authWrapper = document.querySelector('.auth-wrapper');
const loginTrigger = document.querySelector('.login-trigger');
const registerTrigger = document.querySelector('.register-trigger');

if (loginTrigger && registerTrigger && authWrapper) {
    registerTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        authWrapper.classList.add('toggled');
    });

    loginTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        authWrapper.classList.remove('toggled');
    });
}

// =======================
// OPTIONAL: Role detection
// =======================
// Example: if you want to display role-specific headings
const role = localStorage.getItem('userRole');
if (role) {
    const titleSignin = document.querySelector('.credentials-panel.signin h2');
    const titleSignup = document.querySelector('.credentials-panel.signup h2');

    if (titleSignin && titleSignup) {
        if (role === 'student') {
            titleSignin.textContent = "Student Login";
            titleSignup.textContent = "Student Register";
        }
        if (role === 'cafe') {
            titleSignin.textContent = "Cafe Login";
            titleSignup.textContent = "Cafe Register";
        }
        if (role === 'admin') {
            titleSignin.textContent = "Admin Login";
            titleSignup.textContent = "Admin Register";
        }
    }
}
