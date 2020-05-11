const nodemailer = require('nodemailer');
const accountSid = 'ACe7152e4b02ca94ee3eae0c2dd75c30dd';
const authToken = 'cf7c79d69a8a1dd5390c49fc810c6995';
const twilio = require('twilio')(accountSid, authToken);

//Sending email notification for new jobs.
let notifications = {};

notifications.email = (emailID) => {

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
        subject: 'New Job Alert!',
        text: 'A New assistantship job at NMSU has been posted. Please check the application for more details!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

notifications.sms = (sms)=>{

    twilio.messages
    .create({
       body: 'Hello Aggie! A New Assistanship Job has been posted. Please check the app for further details',
       from: '+1 202 933 1211',
       to: '+15755710424'
     })
    .then(message => console.log(message.sid));
}

module.exports= notifications;