document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".btn.prep").forEach(btn => {
    btn.onclick = () => {
      btn.textContent = "Preparing...";
      btn.disabled = true;
    };
  });

  document.querySelectorAll(".btn.ready").forEach(btn => {
    btn.onclick = () => alert("Order marked as READY");
  });

  document.querySelectorAll(".btn.done").forEach(btn => {
    btn.onclick = () => {
      btn.textContent = "Completed";
      btn.disabled = true;
    };
  });

});
