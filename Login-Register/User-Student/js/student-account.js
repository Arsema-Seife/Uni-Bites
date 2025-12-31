document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("profileForm");
  const avatarInput = document.getElementById("avatarUpload");
  const profileImg = document.querySelector(".profile-card img");

  const profileName = document.getElementById("profileName");
  const profilePhone = document.getElementById("profilePhone");

  const infoPhone = document.getElementById("infoPhone");
  const infoEmail = document.getElementById("infoEmail");

  // Load saved data
  if (localStorage.getItem("studentName")) profileName.textContent = localStorage.getItem("studentName");
  if (localStorage.getItem("studentPhone")) profilePhone.textContent = localStorage.getItem("studentPhone");
  if (localStorage.getItem("studentEmail")) infoEmail.textContent = localStorage.getItem("studentEmail");
  if (localStorage.getItem("studentPhone")) infoPhone.textContent = localStorage.getItem("studentPhone");
  if (localStorage.getItem("studentAvatar")) profileImg.src = localStorage.getItem("studentAvatar");

  // Image preview + save
  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      profileImg.src = reader.result;
      localStorage.setItem("studentAvatar", reader.result);
    };
    if (file) reader.readAsDataURL(file);
  });

  // Save profile
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if (name) {
      profileName.textContent = name;
      localStorage.setItem("studentName", name);
    }
    if (phone) {
      profilePhone.textContent = phone;
      infoPhone.textContent = phone;
      localStorage.setItem("studentPhone", phone);
    }
    if (email) {
      infoEmail.textContent = email;
      localStorage.setItem("studentEmail", email);
    }

    alert("Profile updated successfully ✅");
  });

  // Logout
  document.querySelector(".logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });

});
