const crypto = require('crypto');
const moment = require('moment');

// Container for all the helpers
let helpers = {};

// Create a SHA256 hash
helpers.hash = (str) => {
    if (typeof(str) == 'string' && str.length > 0) {
        let hash = crypto.createHmac('sha256', 'thisIsASecret').update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

// Capitalize the first character of a ward
helpers.ucFirst = (word) => {
    if (typeof word !== 'string') return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
};

// Get initials 
helpers.initials = (str) => {
    let result = '';
    let split = str.split(' ');
    
    split.forEach( str => {
        result += str.charAt(0);
    });

    return result;
};

// Validate email
helpers.validateSchoolEmail = async (email) => {
    return await new Promise((resolve, reject) => {
        if( email.search(/[a-zA-Z]+(@)(nmsu)+[.](edu)+/g) >= 0 ){
            resolve(email);
        } else {
            reject('Invalid NMSU email address');
        }
    });
};

helpers.validateEmail = async (email) => {
    const regExp = new ReqExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, i);
    return await new Promise((resolve, reject) => {
        if(regExp.test(email)){
            resolve(email);
        } else {
            reject('Invalid NMSU email address');
        }
    });
};

// Format date
helpers.formatTime = (rows)=>{
    if(rows.length>0){
            rows.forEach(row=>{
            row.created_at= moment(new Date(row.created_at)).fromNow();
      });
    }
    else {
        rows.created_at= moment(new Date(rows.created_at)).fromNow();
    }
    return rows;
};

// Export the module
module.exports = helpers;