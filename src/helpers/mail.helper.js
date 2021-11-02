import nodemailer from 'nodemailer'
const send = async (mailInfo) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 587,
    auth: {
      user: process.env.EMAIL_STORE,
      pass: process.env.EMAIL_PASS,
    },
  })
  const info = await transporter.sendMail(mailInfo)
  console.log('Message send: %s', info.messageId)

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

export const emailProcessor = ({ email, otp, fname }) => {
  const link = `${process.env.ROOT_URL}?otp=${otp}&email=${email}`
  const mailObject = {
    from: `"🤖TECH_STORE🤖 <${process.env.EMAIL_STORE}> `,
    to: email,
    subject: 'User email verification',
    text: `Hello ${fname}, please follow the link to eveify your account email ${link}`,
    html: `
    Hello ${fname},
    <br/>
    <p>Thank you for registering. Please follow the link to verify your email</p>
    </p>
    <br />
    <p> <a href="${link}"> link</a></p>
    `,
  }
  send(mailObject)
}
