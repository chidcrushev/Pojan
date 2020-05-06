const express   = require('express');
const Router    = express.Router();
const db        = require('../config/database-config');
const multer    = require('multer');
const upload    = multer();
const helpers   = require('../config/helpers');

// Custom MySql Errors
let sqlErrors = {'1062': {'title': 'Duplicate Entry', 'message': 'Email already exists. Please try again with a different email.'}};

// Render posts page

/* 
    @TODO 
    - Get all posts from the database
    - Get assistantship data with id
    - Get requisite data with id
    - Get department data with id
    - Get user data with id
    - Get views data from  post_view
*/
Router.get('/', async (req, res, next) => {

    console.log(req.user);

    // let getPosts = await dbQuery('SELECT * FROM post')
    res.render('posts/',{
        navBarEnabled: true,
        pageTitle: 'posts'
    });
});

// Render posts creation page
Router.get('/create', (req, res, next) => {
    res.render('posts/create',{
        navBarEnabled: true,
        pageTitle: 'create'
    });
});


// Render posts application page
Router.get('/apply/:postid', (req, res, next) => {
    res.render('posts/apply',{
        navBarEnabled: true,
        pageTitle: 'apply'
    });
});


/* @TODO 
    - Send notification via email, sms and push
    - Get from tables, userid(user in session), deptid, assistantshipid, requisiteid,
    - check for these ids to make sure they match
    - insert into posts table
    - on successful insertion, broadcast the notifications
*/
Router.post('/create', upload.none(), async (req, res, next) => {
    let postData = req.body;

    // Fetch the dept_id of the selected department
    let get_dept_id = await dbQuery('SELECT dept_id FROM department WHERE dept_name = ?', postData.department);

    // Fetch the requisite_id of the selected requisite type
    let get_requisite_id = await dbQuery('SELECT requisite_id FROM requisite WHERE title = ?', postData.requisite)
    .catch( error => console.log(error));
    
    // Fetch the assistantship_id of the selected assistanship type
    let assistantship_id = Number(postData.assistantship);

    // get the id of the user who posted the job
    let user_id = 1;

    // Get selected notifications: sms, push, email
    // use await and async here 
    if( postData.email !== '' ){
        // send email to registered users
    } else if( postBody.sms !== '' ){
        // send sms to registered users
    } else if( postBody.push !== ''){
        // send sms to registered users
    } else {
        // No notification type selected
        return true;
    }

    // Cleanup the json object
    // Delete non required fields
    delete postData['requisite'];
    delete postData['assistantship'];
    delete postData['department'];
    delete postData['push'];
    delete postData['email'];
    delete postData['sms'];
    
    postData.fk_user_id = user_id,
    postData.status = 1,
    postData.fk_dept_id = get_dept_id[0].dept_id,
    postData.fk_assistantship_id = assistantship_id,
    postData.fk_requisite_id = get_requisite_id[0].requisite_id,

    // Insert data into db
    db.query('INSERT INTO post SET ?', postData, (error, results, fields) => {
        if (error) {
            res.statusMessage = error;
            res.status(400).send();
        } else {
            res.status(200).json({message: 'The post has been successfully created'});
        }
    });
});


let dbQuery = async ( query, val) => {
    return await new Promise((resolve, reject) => {
        db.query( query, [val], (err, rows, fields) => {                                              
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        }
    )}
)};

module.exports = Router;

