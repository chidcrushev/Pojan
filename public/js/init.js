/**
 * @author Chidambaram Crushev, Valentine Aduaka
*/

(() => {
  // Materialize side nav initialization
  let side_nav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(side_nav, {});
  
  // Materialize modal initialization
  let modal = document.querySelectorAll('.modal');
   M.Modal.init(modal, {});


  // Materialize select initialization
  let select = document.querySelectorAll('select');
   M.FormSelect.init(select, {});

  // Materialize Autocomplete initialization
  let autocomplete = document.querySelectorAll('.autocomplete');
  M.Autocomplete.init(autocomplete, {data: {
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
  M.Dropdown.init(dropdown, {});

  // Materialize Tooltip initialization
  let tooltip = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(tooltip, {});

  let characterCounter = document.querySelector('#message');
  M.CharacterCounter.init(characterCounter);


})();




