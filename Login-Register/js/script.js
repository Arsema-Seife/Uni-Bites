
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
// =======================
// FORM SUBMISSION HANDLER
// =======================
function loginUser() {
    const role = localStorage.getItem("userRole");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.username === username &&
             u.password === password &&
             u.role === role
    );

    if (!user) {
        alert("Invalid login credentials");
        return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", role);

    redirectByRole(role);
}

function registerUser() {
    const role = localStorage.getItem("userRole");
    const username = document.getElementById("username").value;
    const email = document.getElementById("email")?.value || "";
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(
        u => u.username === username && u.role === role
    );

    if (exists) {
        alert("User already exists");
        return;
    }

    users.push({ username, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", role);

    redirectByRole(role);
}
function redirectByRole(role) {
    if (role === "student") {
        window.location.href = "User-Student/index.html";
    } else if (role === "cafe") {
        window.location.href = "User-Cafe/index.html";
    } else if (role === "admin") {
        window.location.href = "User-Admin/index.html";
    }
}
document.getElementById("loginForm")?.addEventListener("submit", e => {
    e.preventDefault();
    loginUser();
});

document.getElementById("registerForm")?.addEventListener("submit", e => {
    e.preventDefault();
    registerUser();
});
