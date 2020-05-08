const express   = require('express');
const Router    = express.Router();
const db        = require('../config/database-config');
const multer    = require('multer');
const upload    = multer();
const helpers   = require('../config/helpers');
const authentication = require('../auth/middleware/auth-middleware');

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
// Render posts page
Router.get('/', async (req, res, next) => {

    await dbQuery(`SELECT
        COUNT(p.fk_post_id) as NOSOFAPPLICANTS,
        post.post_id, post.post_title, post.description, post.requirement, post.status, post.created_at, post.updated_at,
        user.user_id, user.firstname, user.lastname, user.email,
        requisite.requisite_title,
        assistantship.assistantship_title,
        department.dept_name
        
        FROM post
        
        INNER JOIN project.user ON user.user_id = post.fk_user_id
        INNER JOIN department ON department.dept_id = post.fk_dept_id
        INNER JOIN assistantship ON assistantship.assistantship_id = post.fk_assistantship_id
        INNER JOIN requisite ON requisite.requisite_id = post.fk_requisite_id 
        LEFT  JOIN  post_applicant p ON p.fk_post_id = post.post_id
        
        GROUP BY post.post_id
        ORDER BY post.updated_at DESC
    `).then((rows) => {
        res.render('posts/', {
            navBarEnabled: true,
            pageTitle: 'posts',
            response: rows
            // error: (typeof result === 'function') ? result(data => req.flash(data)) : false
        });
    }).catch((error) => {
        next(error);
    });
});

// Render posts page
Router.get('/',authentication, (req, res, next) => {
 
    res.render('posts/',{
        navBarEnabled: true,
        pageTitle: 'posts',
        info : req.user
    });
});

// Render posts creation page

Router.get('/create',authentication, (req, res, next) => {
    res.render('posts/create',{
        navBarEnabled: true,
        pageTitle: 'create',
        info : req.user
    });
});


// Render posts application page
Router.get('/apply/:postid',authentication, (req, res, next) => {
    res.render('posts/apply',{
        navBarEnabled: true,
        pageTitle: 'apply',
        info : req.user

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
    let get_dept_id = await dbQuery('SELECT dept_id FROM department WHERE dept_name = ?', postData.department).catch( error => console.log(error));

    // Fetch the requisite_id of the selected requisite type
    let get_requisite_id = await dbQuery('SELECT requisite_id FROM requisite WHERE requisite_title = ?', postData.requisite).catch( error => console.log(error));
                                
    // Fetch the assistantship_id of the selected assistanship type
    let assistantship_id = Number(postData.assistantship);

    // get the id of the user who posted the job
    let user_id = await (req.session.passport.user) ? req.session.passport.user.id : false;

    // Cleanup the json object
    // Delete non required fields
    delete postData['requisite'];
    delete postData['assistantship'];
    delete postData['department'];
    delete postData['push'];
    delete postData['email'];
    delete postData['sms'];
 
    // Append required table fields and values
    postData.fk_user_id = user_id,
    postData.status = 1,
    postData.fk_dept_id = get_dept_id[0].dept_id,
    postData.fk_assistantship_id = assistantship_id,
    postData.fk_requisite_id = get_requisite_id[0].requisite_id;

    // Insert data into db
    await dbQuery('INSERT INTO post SET ?', postData)
    .then( ( response ) => {
        // Get selected notifications: sms, push, email
        // use await and async here 
        if( postData.email !== '' ){
            // send email to registered users
            console.log('Sending email');
        }
        if( postData.sms !== '' ){
            // send sms to registered users
            console.log('Sending sms');
        }
        
        if( postData.push !== ''){
            // send sms to registered users
            console.log('Sending push');
        }
        res.status(200).json({message: 'The post has been successfully created'});
    }).catch( ( error ) => {
        res.statusMessage = error;
            res.status(400).send();
            return false;
    });
});

let dbQuery = async ( query, val = null) => {
    return await new Promise((resolve, reject) => {
        db.query( query, [val], (err, rows, fields) => {                                              
            if(rows === undefined){
                reject(new Error(err));
            }else{
                resolve(rows);
            }
        }
    )}
)};

module.exports = Router;
