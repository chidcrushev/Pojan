// Load dependencies
const express   = require('express');
const Router    = express.Router();
const db  = require('../config/database-config');
const auth = require('../auth/middleware/auth-middleware');
const helpers = require('../config/helpers');
const multer = require('multer');
const upload = multer();

// Render user profile page
Router.get('/profile', auth.isLoggedIn, (req, res, next) => {
    db.query(`
        SELECT department.dept_name from user 
        INNER JOIN department_user ON user.user_id = department_user.fk_user_id 
        INNER JOIN department ON department_user.fk_dept_id = department.dept_id 
        WHERE user_id = ?`, 
        [req.user.user_id], (error, rows) => {
        
        res.render('user/profile', {
            navBarEnabled: true,
            isPageActive: true,
            info: req.user,
            pageTitle: 'profile',
            departmentInfo: (rows.length > 0) ? rows[0].dept_name : null
        });
    });
});

// Route to update user profile
Router.put('/profile/update', upload.none(), auth.isLoggedIn, async (req, res, next) => {
    // Get the post data
    let postData = req.body;
    let user_id = req.session.passport.user.id;
    let phone = Number(postData.phone);

    // Cleanup user data
    let firstname  = helpers.ucFirst(postData.firstname).trim();
    let lastname   = helpers.ucFirst(postData.lastname).trim();

    // Validate form fields
    phone = phone.toString().length === 10 ? phone : false;
    let department = postData.department !== '' ? postData.department : false;
    let student_id = postData.student_id !== '' ? postData.student_id : false;

    // Validate phone nnumber field
    if( !phone ){
        res.statusMessage = "Invalid phone format.";
        res.status(400).send();
        return false;
    } 
    
    // Validate department field
    if(!department){
        res.statusMessage = "Please select your department.";
        res.status(400).send();
        return false;
    } 
    
    // Validate student Id field
    if(!student_id){
        res.statusMessage = "Please provide your student id";
        res.status(400).send();
        return false;
    }

    // Check if selected department ID exists in the database
    let get_dept_id = await db.dbQuery('SELECT dept_id FROM department WHERE dept_name = ?', postData.department).catch( error => console.log(error));
    
    await db.dbQuery('SELECT * FROM department_user WHERE fk_user_id = ?', [user_id])
    .then(async ( result ) => {
        if(result.length === 0){
            // Do insertion
            // Insert new user's data into the database
            await db.dbQuery(`UPDATE user SET 
                firstname = ?, lastname = ? , phone = ?, student_id = ?, updated_at = ?
                WHERE user_id = ?; 
                INSERT INTO department_user (fk_user_id, fk_dept_id, created_at, updated_at) VALUES (?, ?, ?, ?)`, 
                [firstname, lastname, phone, student_id, postData.updated_at, user_id,
                user_id, get_dept_id[0].dept_id, postData.updated_at, postData.updated_at]
            ).then(() => {
                res.status(200).json({message: 'Your profile has been successfully updated'});
            }).catch( error => {
                res.statusMessage = error;
                res.status(400).send();
            });            
        } else {
            // Do an update
            await db.dbQuery(`UPDATE user SET 
                firstname = ?, lastname = ? , phone = ?, student_id = ?, updated_at = ?
                WHERE user_id = ?; 
                UPDATE department_user SET fk_user_id = ?, fk_dept_id = ?, updated_at = ? 
                WHERE fk_user_id = ?`, 
                [firstname, lastname, phone, student_id, postData.updated_at, user_id,
                user_id, get_dept_id[0].dept_id, postData.updated_at, user_id]
            ).then(() => {
                res.status(200).json({message: 'Your profile has been successfully updated'});
            }).catch( error => {
                res.statusMessage = error;
                res.status(400).send();
            });          
        }
    });
});

// Route to update user profile Image
Router.put('/profile/update/image', upload.none(), auth.isLoggedIn, async (req, res, next) => {
    let postData = req.body;
    let user_id = req.session.passport.user.id;

    if( postData.avatar ){
        await db.dbQuery(`UPDATE user SET avatar = ? WHERE user_id = ?`, [postData.avatar, user_id])
        .then(() => {
            res.status(200).json({message: 'Your profile photo has been updated'});
        }).catch( error => {
            res.statusMessage = error;
            res.status(400).json({message: "An error occurred. Please try again"});
        });
    }
});

module.exports = Router;  


 