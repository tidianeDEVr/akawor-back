const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const { MAIL, PASSWORD } = require("../env");

router.post("/send-mail", async (req, res) => {
  /** send mail from real gmail account */
  const config = {
    service: "gmail",
    auth: {
      user: MAIL,
      pass: PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  const response = {
    body: {
      name: "Daily Tuition",
      intro: "Your bill has arrived!",
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend application",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business",
    },
  };

  const mail = MailGenerator.generate(response);

  const message = {
    from: 'kheuch01.cn@gmail.com',
    to: 'cheikhtiindiaye@gmail.com',
    subject: "Place Order",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
  // res.send("sending mail");
});

module.exports = router;
