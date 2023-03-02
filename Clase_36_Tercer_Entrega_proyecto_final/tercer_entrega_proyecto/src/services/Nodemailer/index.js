import nodemailer from 'nodemailer'
import {config} from './config.js'

function createSendMail(mailConfig) {

  const transporter = nodemailer.createTransport(mailConfig);

  return function sendMail({ to, subject, text, html }) {
    const mailOptions = { from: mailConfig.auth.user, to, subject, text, html };
    return transporter.sendMail(mailOptions)
  }
}

function createSendMailGmail() {
  return createSendMail({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth:  {
      user: config.user,
      pass: config.password
    }
  })
}

const sendMail = createSendMailGmail()



export {
    sendMail
}