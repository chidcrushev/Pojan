/**
 * @author Chidambaram Crushev, Valentine Aduaka
*/

// Instantiate socket.io
let socket = io();

document.addEventListener('DOMContentLoaded', function() {
    let side_nav = document.querySelectorAll('.sidenav');
    let side_nav_instance = M.Sidenav.init(side_nav, {});
    
    
    let modal = document.querySelectorAll('.modal');
    let modal_instance = M.Modal.init(modal, {});

    let select = document.querySelectorAll('select');
    let select_instance = M.FormSelect.init(select, {});

    let autocomplete = document.querySelectorAll('.autocomplete');
    let autocomplete_instance = M.Autocomplete.init(autocomplete, {data: {
        "Computer Science": null,
        "Astronomy": null,
        "Chemical Engineering": 'https://placehold.it/250x250'
    }});

    let dropdown = document.querySelectorAll('.dropdown-trigger');
    let dropdown_instance = M.Dropdown.init(dropdown, {});
document.querySelector(".navbar-dropdown").onclick = function () {
document.querySelector(".top-bar-nav").classList.toggle("show-nav");
};

});

//Password and confirm password validation
let password = document.getElementById("password")
let confirmPassword = document.getElementById("confirm_password");

function validatePassword() {
  if (password.value != confirmPassword.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


