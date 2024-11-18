const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    let info = await transporter.sendMail({
      from: '"Mitali" <mitaligoura@cqlsys.co.uk>',
      to: "jeevanbala@cqlsys.co.uk",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);

    res.json(info); 
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};

module.exports = {
  sendMail: sendMail,
};
