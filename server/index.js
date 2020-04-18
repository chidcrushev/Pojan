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

// Static folder
const projectDirectory = path.join(__dirname, '../public');
app.use(express.static(projectDirectory));

//Start the server 
http.listen(port, () => console.log(`Server is listening on port ${port}`));   

