/**
 * @author Chidambaram Crushev, Valentine Aduaka
*/

(() => {
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
      "Chemistry": null,
      "Physics": null,
      "Biology": null,
      "Agriculture": null,
      "Arts": null,
      "Geology": null,
      "Mathematical Sciences": null,
      "Social Sciences": null,
  }});

  // Materialize Dropdown initialization
  let dropdown = document.querySelectorAll('.dropdown-trigger');
  let dropdown_instance = M.Dropdown.init(dropdown, {});

  // Materialize Tooltip initialization
  let tooltip = document.querySelectorAll('.tooltipped');
  let tooltip_instance = M.Tooltip.init(tooltip, {});

  let characterCounter = document.querySelector('#message');
  M.CharacterCounter.init(characterCounter);

  let referrer = document.referrer;

  /* 
    if the flash message element has a textContent, then fire the toast
  */

  // if ( referrer.split('/').indexOf('signup') > 0){
  //   M.toast({html: 'Please sign in with your credentials'});
  // }

  // if ( referrer.split('/').indexOf('create') > 0){
  //   M.toast({html: 'Your post was successfully created'});
  // }

  // Toggle top bar menu dropdown
//   document.querySelector(".navbar-dropdown").addEventListener('click', (e) => {
//       document.querySelector(".top-bar-nav").classList.toggle("show-nav");
//       e.stopPropagation();
//   }, false);

//     // Hide top bar menu
//     window.onclick = () => { document.querySelector(".top-bar-nav").classList.remove("show-nav");};

})();




