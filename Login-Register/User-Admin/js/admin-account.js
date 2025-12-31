// Exactly same JS logic as student-account.js
// Change localStorage keys to admin-specific

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("profileForm");
  const avatarInput = document.getElementById("avatarUpload");
  const profileImg = document.getElementById("profileImg");

  const profileName = document.getElementById("profileName");
  const profilePhone = document.getElementById("profilePhone");

  const infoPhone = document.getElementById("infoPhone");
  const infoEmail = document.getElementById("infoEmail");

  // Load saved data
  if (localStorage.getItem("adminName")) profileName.textContent = localStorage.getItem("adminName");
  if (localStorage.getItem("adminPhone")) profilePhone.textContent = localStorage.getItem("adminPhone");
  if (localStorage.getItem("adminEmail")) infoEmail.textContent = localStorage.getItem("adminEmail");
  if (localStorage.getItem("adminPhone")) infoPhone.textContent = localStorage.getItem("adminPhone");
  if (localStorage.getItem("adminAvatar")) profileImg.src = localStorage.getItem("adminAvatar");

  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      profileImg.src = reader.result;
      localStorage.setItem("adminAvatar", reader.result);
    };
    if (file) reader.readAsDataURL(file);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if (name) { profileName.textContent = name; localStorage.setItem("adminName", name); }
    if (phone) { profilePhone.textContent = phone; infoPhone.textContent = phone; localStorage.setItem("adminPhone", phone); }
    if (email) { infoEmail.textContent = email; localStorage.setItem("adminEmail", email); }

    alert("Profile updated successfully ✅");
  });

  document.querySelector(".logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });

});
