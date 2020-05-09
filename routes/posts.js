const path   = require('path');
const express   = require('express');
const Router    = express.Router();
const db        = require('../config/database-config');
const multer    = require('multer');
const helpers   = require('../config/helpers');
const auth = require('../auth/middleware/auth-middleware');
const moment    = require('moment');
const upload    = multer();

const fileupload   = multer({
    dest: 'uploads/',
    fileFilter: (req, file, next) => {
        let allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        
        // File type validation
        if(!allowedFileTypes.includes(file.mimetype)) {
            return next(new Error('Wrong file format uploaded'));
        }

        // File size validation
        if(file.size > 5000) {
            return next(new Error('File is too large'));
        }

        next(null, true);
    },
});

Router.get('/fetch/:postid', async (req, res, next) => {

    // Get the post id
    let post_id = req.params.postid;

    // Fetch the post id
    await db.dbQuery(
        `SELECT
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
        WHERE post.post_id = ?
        GROUP BY post.post_id
        ORDER BY post.updated_at DESC`, [post_id]
    ).then((rows) => {
        res.render('modal', {
            layout: false,
            navBarEnabled: true,
            pageTitle: 'posts',
            response: helpers.formatTime(rows[0]),
            info: req.user,
            applyUrl: '/posts/apply/'+post_id
        });
    }).catch((error) => {
        next(error);
    });
});


// Render posts page
Router.get('/', auth.isLoggedIn, async (req, res, next) => {
    await db.dbQuery(
        `SELECT
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
        ORDER BY post.created_at DESC
    `).then((rows) => {
        let result = helpers.formatTime(rows);
        res.render('posts/', {
            navBarEnabled: true,
            pageTitle: 'posts',
            response: result,
            info: req.user,
            // error: (typeof result === 'function') ? result(data => req.flash(data)) : false
        });
    }).catch((error) => {
        next(error);
    });
});

// Render posts page
Router.get('/', auth.isLoggedIn, (req, res, next) => {
    res.render('posts/',{
        navBarEnabled: true,
        pageTitle: 'posts',
        info : req.user
    });
});

// Render posts creation page
Router.get('/create', auth.isLoggedIn, auth.isAdmin, (req, res, next) => {
    res.render('posts/create',{
        navBarEnabled: true,
        pageTitle: 'Create a Post',
        info : req.user
    });
});

// Render posts application page
Router.get('/apply/:postid', auth.isLoggedIn, async (req, res, next) => {

    let postIdUrl = req.params.postid;
    let backURL = req.header('Referer') || '/';

    await db.dbQuery('SELECT post_id, post_title, fk_user_id FROM post WHERE post_id = ? ', [postIdUrl])
    .then(( response ) => {
        res.render('posts/apply',{
            navBarEnabled: true,
            pageTitle: 'Apply',
            info : req.user,
            post: response[0]
        });
    })
    .catch( error => {
        res.statusMessage = error;
        res.status(400).send();
        res.redirect(backURL);
    });
});

// Render posts application page
Router.post('/apply/create', fileupload.single('resume'), auth.isLoggedIn, async (req, res, next) => {

    let postData = req.body;

    // Check message character length
    if(postData.post_applicant_message.length > 500){
        res.statusMessage = "You exceeded the required character length";
        res.status(400).send();
        return false;
    }

    // Everything went fine.
    // Check if this user have applied for this job already
    await new Promise((resolve, reject) => {
        db.query('SELECT fk_user_id FROM post_applicant WHERE fk_user_id = ? AND fk_post_id = ?', 
        [req.user.user_id, postData.fk_post_id], (err, rows, fields) => {
            if( rows.length >  0){
                let error_msg = "You already applied for this job";
                return reject(error_msg);
            }

            return resolve(rows);
        });
    }).then( async ( response, error ) => {
        
        if ( response.length === 0 ) {
            // Get the email of the user that posted this job
            let postedBy = await db.dbQuery('SELECT email FROM user WHERE user_id = ?', postData.fk_user_id)
                            .catch((error) => {
                                let error_msg = "Cannot find the user who posted the job";
                                res.statusMessage = error_msg;
                                res.status(400).send();
                                return false;
                            });
            
            if (postedBy.length > 0 ) {
                // Append required fields
                postData.fk_user_id = req.user.user_id;
                postData.file_path = req.file.path;

                // Insert data into db
                db.dbQuery('INSERT INTO post_applicant SET ?', postData)
                .then( ( response ) => {
                    if( postData.email !== '' ){
                        console.log('Sending email to ', postedBy[0].email);
                    }

                    res.status(200).json({message: 'Thank you. Your application has been sent.', redirectTo: '/posts'});
                }).catch( ( error ) => {
                    res.statusMessage = error;
                    res.status(400).send();
                    return false;
                });
            }
        }
    }).catch((error) => {
        res.statusMessage = error;
            res.status(400).send();
            return false;
    }); 
});


/* @TODO 
    - Send notification via email, sms and push
    - Get from tables, userid(user in session), deptid, assistantshipid, requisiteid,
    - check for these ids to make sure they match
    - insert into posts table
    - on successful insertion, broadcast the notifications
*/
Router.post('/create', upload.none(), auth.isLoggedIn, async (req, res, next) => {
    let postData = req.body;

    // Fetch the dept_id of the selected department
    let get_dept_id = await db.dbQuery('SELECT dept_id FROM department WHERE dept_name = ?', postData.department).catch( error => console.log(error));

    // Fetch the requisite_id of the selected requisite type
    let get_requisite_id = await db.dbQuery('SELECT requisite_id FROM requisite WHERE requisite_title = ?', postData.requisite).catch( error => console.log(error));
                                
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
    await db.dbQuery('INSERT INTO post SET ?', postData)
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

module.exports = Router;
