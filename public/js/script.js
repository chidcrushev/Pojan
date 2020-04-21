/**
 * @author Chidambaram Crushev, Valentine Aduaka
*/

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

});

// Instantiate socket.io
let socket = io();

