// //auth/authorization.js
// const  db = require('../config/database-config');
// let authorization = module.exports = {}

// // let User = require('../repositories/userRepository')

// // Higher order function to keep DRY
// let authenticate = ({type, message, redirectPath}) => {
//   return (req, res, next) => {
//     let isAuthenticated = req.isAuthenticated()
//     if (!isAuthenticated) {
//       req.flash(type, message)
//       return res.redirect(redirectPath)
//     }
//     next()
//   }
// }

// // ===AUTHORIZATION MDDLEWARE
// authorization.loginRequired = authenticate({
//   type: 'messageFailure',
//   message: 'Must be logged in',
//   redirectPath: '/signin'
// })

// authorization.signupRequired = authenticate({
//   type: 'messageFailure',
//   message: 'Must be signed up',
//   redirectPath: '/signup'
// })


// authorization.adminRequired = async (req, res, next) => {
//   let id = req.user && req.user.id
//   let user = await db.query('SELECT id FROM user WHERE id = ?', [id], (err, rows, fields) => rows > 0);
//   let isAdmin = user && user.admin

//   if (!isAdmin) {
//     req.flash('messageFailure', 'Faculty member only')
//     return res.redirect('/users/profile')
//   }

//   next();
// }