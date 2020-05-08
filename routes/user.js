const express   = require('express');
const Router    = express.Router();
const db  = require('../config/database-config');
const authentication = require('../auth/middleware/auth-middleware');


// Render user profile page
Router.get('/profile', authentication, async (req, res, next) => {
    
await db.query(`select department.dept_name from user INNER JOIN department_user ON user.user_id= department_user.fk_user_id 
    INNER JOIN department ON department_user.fk_dept_id=department.dept_id 
    where user_id = ?`, [req.user.user_id], (error, rows)=>{
    
        res.render('user/profile', {
            navBarEnabled: true,
            isPageActive: true,
            info: req.user,
            pageTitle: 'profile',
            departmentInfo: rows.length>0 ? rows[0].dept_name : null
        });
    }) 
   
});

module.exports = Router;  


 