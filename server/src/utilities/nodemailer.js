import nodemailer from 'nodemailer';

const sendEmail = async () => {
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
    to: 'almasfikri0@gmail.com',
    subject: 'Test mail',
    text: 'Ngetest doang hahaha',
  };

  const check = await mailTransporter.sendMail(mailDetails);
  console.log(check);
};

export default sendEmail;
