const crypto = require('crypto');

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
    if (typeof word !== 'string') return ''
    return word.charAt(0).toUpperCase() + word.slice(1)
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
helpers.validateEmail = async (email) => {
    return await new Promise((resolve, reject) => {
        if( email.search(/[a-zA-Z]+(@)(nmsu)+[.][a-zA-z]+(|[.])[a-zA-Z]+/g) >= 0 ){
            resolve(email)
        } else {
            reject('Invalid NMSU email address');
        }
    });
};

// Export the module
module.exports = helpers;