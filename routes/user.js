const express   = require('express');
const Router    = express.Router();

// Render user profile page
Router.get('/profile', (req, res) => {
    res.render('user/profile', {
        navBarEnabled: true,
        isPageActive: true
    });
});

module.exports = Router;

