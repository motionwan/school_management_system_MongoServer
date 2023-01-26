const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: process.env.EMAILPORT,
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transport.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email sent successfully');
    return { message: 'Email sent check your email for activation' };
  } catch (e) {
    console.log('email not sent');
    console.log(e);
  }
};

module.exports = sendEmail;
