
/* =====================
   ROLE SELECTION
===================== */
function chooseRole(role, event) {
    localStorage.setItem('userRole', role);

    // Remove previous selections
    document.querySelectorAll('.role-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Select clicked card
    event.currentTarget.classList.add('selected');

    // Fade page out
    document.body.classList.add('fade-out');

    // Delay navigation for animation
    setTimeout(() => {
       if (role === 'student') {window.location.href = "student-register.html";
       }else if (role === 'cafe') {window.location.href = "cafe-register.html";
       }else {
        window.location.href = "admin-register.html";
       }
    }, 500);
}
