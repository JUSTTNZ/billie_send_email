const { Router } from " express";

const router = Router();
const sendEmail = require('./controller/sendEmail.js')

router.route('/').get((req, res) => {
    res.send('<h1>Email Project</h1> <a href="/send">send email</a>');
});

router.route('/send').post(sendEmail);