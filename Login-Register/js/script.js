/* LOGIN / REGISTER TOGGLE */
document.addEventListener('DOMContentLoaded', function() {
    const authWrapper = document.querySelector('.auth-wrapper');
    const loginTrigger = document.querySelector('.login-trigger');
    const registerTrigger = document.querySelector('.register-trigger');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (registerTrigger && authWrapper) {
        registerTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            authWrapper.classList.add('toggled');
        });
    }

    if (loginTrigger && authWrapper) {
        loginTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            authWrapper.classList.remove('toggled');
        });
    }

    updateFormTitles();
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (registerForm) registerForm.addEventListener('submit', handleRegister);
});

function updateFormTitles() {
    const role = localStorage.getItem('userRole');
    if (!role) return;

    const loginTitle = document.querySelector('.credentials-panel.signin h2');
    const registerTitle = document.querySelector('.credentials-panel.signup h2');
    const titles = {
        student: { login: 'Student Login', register: 'Student Register' },
        cafe: { login: 'Cafe Owner Login', register: 'Cafe Owner Register' },
        admin: { login: 'Admin Login', register: 'Admin Register' }
    };

    if (titles[role]) {
        if (loginTitle) loginTitle.textContent = titles[role].login;
        if (registerTitle) registerTitle.textContent = titles[role].register;
    }
}

function handleLogin(event) {
    event.preventDefault();
    const role = localStorage.getItem('userRole');
    if (!role) {
        alert('Please select a role first');
        window.location.href = 'role.html';
        return;
    }

    const form = event.target;
    const username = form.querySelector('input[type="text"]')?.value.trim();
    const password = form.querySelector('input[type="password"]')?.value.trim();
    
    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (!user) {
        alert('Invalid login credentials');
        return;
    }

    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    redirectByRole(role);
}

function handleRegister(event) {
    event.preventDefault();
    const role = localStorage.getItem('userRole');
    if (!role) {
        alert('Please select a role first');
        window.location.href = 'role.html';
        return;
    }

    const form = event.target;
    const username = form.querySelector('input[type="text"]')?.value.trim();
    const email = form.querySelector('input[type="email"]')?.value.trim();
    const password = form.querySelector('input[type="password"]')?.value.trim();
    
    if (!username || !password) {
        alert('Please fill in required fields');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username && u.role === role)) {
        alert('Username already exists');
        return;
    }

    const newUser = { username, email, password, role, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    alert('Registration successful!');
    redirectByRole(role);
}

function redirectByRole(role) {
    const paths = {
        student: 'User-Student/index.html',
        cafe: 'User-Cafe/cafe-home.html',
        admin: 'User-Admin/Admin-home.html'
    };
    window.location.href = paths[role] || 'role.html';
}