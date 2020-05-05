/**
 * @author Chidambaram Crushev, Valentine Aduaka
*/

// Instantiate socket.io
let socket = io();

document.addEventListener('DOMContentLoaded', () => {

  // Materialize side nav initialization
  let side_nav = document.querySelectorAll('.sidenav');
  let side_nav_instance = M.Sidenav.init(side_nav, {});
  
  // Materialize modal initialization
  let modal = document.querySelectorAll('.modal');
  let modal_instance = M.Modal.init(modal, {});

  // Materialize select initialization
  let select = document.querySelectorAll('select');
  let select_instance = M.FormSelect.init(select, {});

  // Materialize Autocomplete initialization
  let autocomplete = document.querySelectorAll('.autocomplete');
  let autocomplete_instance = M.Autocomplete.init(autocomplete, {data: {
      "Computer Science": null,
      "Astronomy": null,
      "Chemical Engineering": 'https://placehold.it/250x250'
  }});

  // Materialize Dropdown initialization
  let dropdown = document.querySelectorAll('.dropdown-trigger');
  let dropdown_instance = M.Dropdown.init(dropdown, {});

  // Materialize Tooltip initialization
  let tooltip = document.querySelectorAll('.tooltipped');
  let tooltip_instance = M.Tooltip.init(tooltip, {});

  // Toggle top baar menu dropdown
  document.querySelector(".navbar-dropdown").addEventListener('click', (e) => {
      document.querySelector(".top-bar-nav").classList.toggle("show-nav");
      e.stopPropagation();
  }, false);

  // Hide top bar menu
  window.onclick = () => { document.querySelector(".top-bar-nav").classList.remove("show-nav");};

  // Password and confirm password validation
  let password = document.getElementById("password")
  let confirmPassword = document.getElementById("confirm_password");

  let validatePassword = () => {
    if (password.value != confirmPassword.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity('');
    }
  }

  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;

});




