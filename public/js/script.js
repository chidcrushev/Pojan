//   Toggle top bar menu dropdown
document.querySelector(".navbar-dropdown").addEventListener('click', (e) => {
  document.querySelector(".top-bar-nav").classList.toggle("show-nav");
  e.stopPropagation();
}, false);

    // Hide top bar menu
window.onclick = () => { document.querySelector(".top-bar-nav").classList.remove("show-nav");};
