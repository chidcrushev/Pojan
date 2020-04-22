/**
 * @author Chidambaram Crushev, Valentine Aduaka
*/

//Dependencies
const express   = require('express');
const path      = require('path');
const app       = express();
const http      = require('http').createServer(app);
const io        = require('socket.io')(http);
const port      = process.env.PORT || 2000;

//Setting up twilio messaging API
// Need to create an account in twilio
// const account   = '';
// const authToken = '';
// const twilio    = require('twilio')(account,authToken);

// Set static folder
app.use( express.static(path.join(__dirname, 'public'), {extensions: ['html', 'htm']}) );

//Start the server 
http.listen(port, () => console.log(`Server is listening on port ${port}`));   

