import express from 'express'
import {
  createProfile,
  activateProfile,
} from '../models/profile/Profile.model.js'
import {
  newProfileFormValidation,
  emaiVerificationValidator,
} from '../middleware/validation.middleware.js'
import { hashPassword } from '../helpers/bcrypt.helper.js'
import {
  createUniqueResetPin,
  findUniqueResetPin,
  deleteUniqueResetPin,
} from '../models/reset-pin/ResetPin.model.js'
import { getRandomOTP } from '../helpers/otp.helper.js'
import { emailProcessor, verificationEmail } from '../helpers/mail.helper.js'
const profileRouter = express.Router()

profileRouter.all('/', (req, res, next) => {
  console.log('router connected')

  next()
})

profileRouter.post('/', newProfileFormValidation, async (req, res, next) => {
  try {
    const hashedPass = hashPassword(req.body.password)

    req.body.password = hashedPass

    const result = await createProfile(req.body)
    if (result?._id) {
      //create otp
      const optLength = 8
      const otp = getRandomOTP(optLength)
      const uniqueCombo = {
        otp,
        email: result.email,
        fname: result.fname,
      }
      const uniqueResetPin = await createUniqueResetPin(uniqueCombo)
      // console.log(uniqueResetPin, '=====uniqueResetPin')
      //email confirmation
      if (uniqueResetPin?._id) {
        emailProcessor(uniqueCombo)
      }
      return res.json({
        status: 'success',
        message:
          'New profile has been created. Please verify your account by following the verification link sent to your email',
        result,
      })
    }
    res.json({
      status: 'error',
      message: 'unable to create new profile',
    })
  } catch (error) {
    console.log(error)
    let msg = 'Error, unable to create new profile. Please contact admin'
    if (error.message.includes('E11000 duplicate key error collection')) {
      msg = 'There is an account already associaed eith this email.'
    }
    res.json({
      status: 'Error',
      message: msg,
    })
  }
})

profileRouter.post(
  '/email-verification',
  emaiVerificationValidator,
  async (req, res) => {
    try {
      // console.log(req.body)
      //check if pin & email combo exist in DB
      const verificationResult = await findUniqueResetPin(req.body)
      if (verificationResult?._id) {
        //if yes, then update user status to active
        const isProfileActive = await activateProfile(req.body.email)

        if (isProfileActive?._id) {
          //send welcome email to user
          verificationEmail(req.body.email, req.body.fname)
          //delete reset pin data
          deleteUniqueResetPin(req.body)
          return res.json({
            status: 'success',
            message: 'Your account has been verified. You may log in now',
          })
        }
      }

      res.json({
        status: 'error',
        message: 'invalid or expired link',
      })
    } catch (error) {
      res.json({
        status: 'error',
        message: 'Error, unable to process your request at this moment',
      })
    }
  }
)
// profileRouter.get('/', (req, res, next) => {
//   res.json({
//     status: 'ok',
//     message: 'this is the get response',
//   })
// })
//profileRouter.patch()

export default profileRouter
