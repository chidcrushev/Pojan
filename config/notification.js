const nodemailer = require('nodemailer');
const accountSid = 'ACe7152e4b02ca94ee3eae0c2dd75c30dd';
const authToken = 'cf7c79d69a8a1dd5390c49fc810c6995';
const twilio = require('twilio')(accountSid, authToken);

//Sending email notification to registered students for new jobs.
let notifications = {};

notifications.email = (emailID , dept_name) => {

    let emailArr = [];
    emailID.forEach(value =>{
        emailArr.push(value.email);
    })

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        // Gmail Id used to send the alerts
        auth: {
            user: 'pojan.jobs@gmail.com',
            pass: 'pojan12val'
        },
        tls: {
            rejectUnauthorized: false
        }
    });



    let mailOptions = {
        from: 'pojan.jobs@gmail.com',
        to: emailArr,
        subject: 'New Job Alert Aggies!',
        text: 'Hello Aggie, \nA New assistantship job at ' +dept_name+ ' department has been posted. Please check the POJAN app for more details! \n\nBest Regards,\nPOJAN team, \nNMSU.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

//Sending sms notification to registered students for new jobs.
notifications.sms = (sms, dept_name) => {

    let smsArr = [];
    sms.forEach(value => {
        twilio.messages.create({
                body: 'Hello Aggie! A New Assistanship Job at ' + dept_name + ' department has been posted. Please check the POJAN app for further details.',
                from: '+1 202 933 1211',
                to: value.phone
            })
            .then(message => console.log(message.sid));
    })
}

module.exports= notifications;