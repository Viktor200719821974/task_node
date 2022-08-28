const nodemailer = require('nodemailer');
const path = require("path");
const {google} = require('googleapis');
const hbs = require('nodemailer-express-handlebars');
require('dotenv').config();

const emailService = async (context, email, template) => {
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./src/email-templates/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./src/email-templates/'),
    };
    let subject;
    let templateName;
    if (template === 'newPosition') {
        subject = 'New position';
        templateName = 'newPosition';
    }
    if (template === 'deletePosition') {
        subject = 'This position is not available ';
        templateName = 'deletePosition';
    }
    if (template === 'applicant') {
        subject = 'New applicant';
        templateName = 'newApplicant';
    }
    const OAuth2 = google.auth.OAuth2;
    const myOAuth2Client = new OAuth2(
        process.env.CLIENT_ID_EMAIL,
        process.env.CLIENT_SECRET_KEY_EMAIL,
        process.env.REDIRECT_URL_EMAIL
    );
    myOAuth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN_EMAIL,
    });
    const myAccessToken = myOAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.NO_REPLY_EMAIL,
            pass: process.env.EMAIL_PASSWORD,
            clientId: process.env.CLIENT_ID_EMAIL,
            clientSecret: process.env.CLIENT_SECRET_KEY_EMAIL,
            refreshToken: process.env.REFRESH_TOKEN_EMAIL,
            accessToken: myAccessToken
        }
    });
    transporter.use('compile', hbs(handlebarOptions));
    const mailOptions = {
        from: process.env.NO_REPLY_EMAIL,
        to: email,
        subject,
        template: templateName,
        context: {
            array: context
        }
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    emailService
}