/**
 * @author Chidambaram Crushev, Valentine Aduaka
*/

// Instantiate socket.io
let socket = io();

//Password and confirm password validation
var password = document.getElementById("password")
var confirmPassword = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirmPassword.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;