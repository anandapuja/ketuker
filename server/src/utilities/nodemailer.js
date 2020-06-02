import nodemailer from 'nodemailer';

const sendEmail = async (mail, sub, text) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailDetails = {
    from: process.env.EMAIL,
    to: mail,
    subject: sub,
    text: text,
  };

  const isSuccess = await mailTransporter.sendMail(mailDetails);
  console.log(isSuccess);
};

export default sendEmail;
