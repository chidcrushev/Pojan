// Load dependencies
const express   = require('express');
const Router    = express.Router();
const db        = require('../config/database-config');
const multer    = require('multer');
const helpers   = require('../config/helpers');
const auth = require('../auth/middleware/auth-middleware');
const upload    = multer();
const notification = require('../config/notification');


// Multer file upload configuration
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

// Route to fetch selected post and display on the modal
Router.get('/fetch/:postid',  auth.isLoggedIn, async (req, res, next) => {

    // Get the post id
    let post_id = req.params.postid;
    let user_id = req.session.passport.user.id;

    // Fetch the post id
    await db.dbQuery(
        `SELECT 
        COUNT(view.fk_post_id) as NOSOFVIEWS,
        p.*
        FROM post_view as view
        RIGHT JOIN
                (SELECT
                COUNT(applicant.fk_post_id) as NOSOFAPPLICANTS,
                post.post_id as post_id, 
                post.post_title, 
                post.description, 
                post.requirement, 
                post.status, 
                post.created_at, 
                post.updated_at,
                user.user_id, 
                user.firstname, 
                user.lastname, 
                user.email,
                requisite.requisite_title,
                assistantship.assistantship_title,
                department.dept_name
                
                FROM post
                
                INNER JOIN project.user ON user.user_id = post.fk_user_id
                INNER JOIN department ON department.dept_id = post.fk_dept_id
                INNER JOIN assistantship ON assistantship.assistantship_id = post.fk_assistantship_id
                INNER JOIN requisite ON requisite.requisite_id = post.fk_requisite_id 
                LEFT  JOIN  post_applicant applicant ON applicant.fk_post_id = post.post_id
                WHERE post.post_id = ?
                GROUP BY post.post_id
                ORDER BY post.created_at DESC) as p ON view.fk_post_id = p.post_id GROUP BY p.post_id;
                
                INSERT INTO post_view (fk_user_id, fk_post_id) VALUES (? , ?)`, [post_id, user_id, post_id]
    ).then((rows) => {
        res.render('modal', {
            layout: false,
            navBarEnabled: true,
            pageTitle: 'posts',
            response: helpers.formatTime(rows[0][0]),
            info: req.user,
            applyUrl: '/posts/apply/'+post_id
        });
    }).catch((error) => {
        next(error);
    });
});

// Route to display paginated posts
Router.get('/page/:page?/', auth.isLoggedIn, async (req, res, next) => {
    // Import pagination class
    Pagination = require('../model/Pagination');
    // Get current page from url (request parameter)
    page_id = parseInt(req.params.page) || 1;
    let curPage = page_id > 0 ? page_id : currentPage;

    //Change pageUri to your page url without the 'page' query string 
    pageUri = '/posts/page/';

    /*Get total items*/
    db.query('SELECT COUNT(post_id) as totalCount FROM post',(err, rows, field) => {

        // Display 10 items per page
        const perPage = 5,
            totalCount = rows[0].totalCount;

        // Instantiate Pagination class
        const Paginate = new Pagination(totalCount, curPage, pageUri, perPage);

        /*Query items*/
        db.query(`SELECT 
        COUNT(view.fk_post_id) as NOSOFVIEWS,
        p.*
        FROM post_view as view
        RIGHT JOIN
                (SELECT
                COUNT(applicant.fk_post_id) as NOSOFAPPLICANTS,
                post.post_id as post_id, 
                post.post_title, 
                post.description, 
                post.requirement, 
                post.status, 
                post.created_at, 
                post.updated_at,
                user.user_id, 
                user.firstname, 
                user.lastname, 
                user.email,
                requisite.requisite_title,
                assistantship.assistantship_title,
                department.dept_name
                
                FROM post
                
                INNER JOIN project.user ON user.user_id = post.fk_user_id
                INNER JOIN department ON department.dept_id = post.fk_dept_id
                INNER JOIN assistantship ON assistantship.assistantship_id = post.fk_assistantship_id
                INNER JOIN requisite ON requisite.requisite_id = post.fk_requisite_id 
                LEFT  JOIN  post_applicant applicant ON applicant.fk_post_id = post.post_id
                GROUP BY post.post_id) as p ON view.fk_post_id = p.post_id GROUP BY p.post_id
                ORDER BY p.created_at DESC
                LIMIT ${Paginate.perPage} 
                OFFSET ${Paginate.offset}`,
        (err, rows, field)=>{

            // Send data to view
            res.render('posts/', {
                navBarEnabled: true,
                pageTitle: 'posts',
                response: helpers.formatTime(rows),
                info: req.user,
                pages : Paginate.links()
                // error: (typeof result === 'function') ? result(data => req.flash(data)) : false
            });
        });
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
                        // console.log('Sending email to ', postedBy[0].email);
                    }

                    res.status(200).json({message: 'Thank you. Your application has been sent.', redirectTo: '/posts/page'});
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


// Route to create posts
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
    //Pass the department for email and sms notification system
    let dept_name = postData.department;
    let push    = postData.push;
    let email   = postData.email;
    let sms     = postData.sms;

    // Cleanup the json object
    // Delete non required fields
    delete postData.requisite;
    delete postData.assistantship;
    delete postData.department;
    delete postData.push;
    delete postData.email;
    delete postData.sms;

    // Filter entries
    postData.post_title = helpers.ucFirst(postData.post_title).trim();
    postData.description = helpers.ucFirst(postData.description).trim();
    postData.requirement = helpers.ucFirst(postData.requirement).trim();
 
    // Append required table fields and values
    postData.fk_user_id = user_id;
    postData.status = 1;
    postData.fk_dept_id = get_dept_id[0].dept_id;
    postData.fk_assistantship_id = assistantship_id;
    postData.fk_requisite_id = get_requisite_id[0].requisite_id;

    // Insert data into db
    await db.dbQuery('INSERT INTO post SET ?', postData)
    .then(async ( response, error ) => {
        // Get selected notifications: sms, push, email
        // use await and async here 
        if (email !== undefined) {
            // send email to registered users
            let emailID = await db.dbQuery('SELECT email from user WHERE isStudent= true').catch(error => console.log(error));
            if (emailID.length > 0) {
                notification.email(emailID, dept_name);
            }
        }
        if (sms !== undefined) {
            // send sms to registered users
            let phoneNo = await db.dbQuery('SELECT phone from user WHERE isStudent= true and phone IS NOT NULL').catch(error => console.log(error));
            if (phoneNo.length > 0) {
                notification.sms(phoneNo, dept_name);
            }
        }
        if( push !== undefined){
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
