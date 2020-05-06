const express   = require('express');
const Router    = express.Router();

// Render reset page
Router.get('/', (req, res) => {
    res.render('reset');
});

module.exports = Router;

