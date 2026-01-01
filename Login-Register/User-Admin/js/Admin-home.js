document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".btn.primary").forEach(btn => {
    btn.onclick = () => {
      btn.textContent = "Approved";
      btn.disabled = true;
    };
  });

  document.querySelectorAll(".btn.outline").forEach(btn => {
    btn.onclick = () => alert("Action completed");
  });

  document.querySelector(".btn-alert").onclick = () => {
    confirm("Are you sure you want to activate emergency lockdown?");
  };

});

