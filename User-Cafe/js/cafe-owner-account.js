document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("profileForm");
  const avatarInput = document.getElementById("avatarUpload");
  const profileImg = document.getElementById("profileImg");

  const profileName = document.getElementById("profileName");
  const profilePhone = document.getElementById("profilePhone");

  const infoPhone = document.getElementById("infoPhone");
  const infoEmail = document.getElementById("infoEmail");

  // Load saved data
  if (localStorage.getItem("ownerName")) profileName.textContent = localStorage.getItem("ownerName");
  if (localStorage.getItem("ownerPhone")) profilePhone.textContent = localStorage.getItem("ownerPhone");
  if (localStorage.getItem("ownerEmail")) infoEmail.textContent = localStorage.getItem("ownerEmail");
  if (localStorage.getItem("ownerPhone")) infoPhone.textContent = localStorage.getItem("ownerPhone");
  if (localStorage.getItem("ownerAvatar")) profileImg.src = localStorage.getItem("ownerAvatar");

  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      profileImg.src = reader.result;
      localStorage.setItem("ownerAvatar", reader.result);
    };
    if (file) reader.readAsDataURL(file);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if (name) { profileName.textContent = name; localStorage.setItem("ownerName", name); }
    if (phone) { profilePhone.textContent = phone; infoPhone.textContent = phone; localStorage.setItem("ownerPhone", phone); }
    if (email) { infoEmail.textContent = email; localStorage.setItem("ownerEmail", email); }

    alert("Profile updated successfully ✅");
  });

  document.querySelector(".logout").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });

});
