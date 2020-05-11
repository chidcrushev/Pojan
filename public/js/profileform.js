let profileForm = document.getElementById('profileForm');
let elemEditProfile = document.getElementById('editProfile');
let elemProfileImg = document.querySelectorAll('.profile-avatars');
let profileLoader = document.getElementById('profileLoader');
let profileLoaderElem = document.getElementById('profileLoaderElem');

// Initialize signup form    
PojanForm.init({
    profileForm: profileForm ? profileForm : false,
    elemEditProfile: elemEditProfile ? elemEditProfile : false,
    elemProfileImg: elemProfileImg ? elemProfileImg : false,
    profileLoader: profileLoader ? profileLoader : false,
    profileLoaderElem: profileLoaderElem ? profileLoaderElem : false
});