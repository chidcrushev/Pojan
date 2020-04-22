const query = {
    'selectId': 'Select * from USERS where user_id = ?',
    'selectEmail': 'Select * from USERS where email_id= ?',
    'insert': 'Insert into USERS(fk_dept_id, firstname, lastname, isStudent,student_id, email_id,password,contact)values(?,?,?,?,?,?,?,?)'
}

module.exports= query;