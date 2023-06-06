const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer');

router.post('/send-mail', async(req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cheikhtiindiaye@gmail.com',
          pass: 'Nbjuj@7391'
        }
    });
      
    var mailOptions = {
        from: 'cheikhtiindiaye@gmail.com',
        to: 'kheuch01.cn@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    res.send('sending mail');
})

module.exports = router