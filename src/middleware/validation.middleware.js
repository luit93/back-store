import Joi from 'joi'
const shortStr = Joi.string().max(30).required().alphanum()
const email = Joi.string().email({ minDomainSegments: 2 }).max(30).required()
const str = Joi.string().max(30)
const phone = Joi.string().max(15).allow('')
const password = Joi.string().min(6).max(50).required()
const date = Joi.date().allow('').allow(null)
const otp = Joi.string().min(6).max(50).required()
export const newProfileFormValidation = (req, res, next) => {
  console.log(req.body)

  const schema = Joi.object({
    fname: shortStr,
    lname: shortStr,
    dob: date,
    email,
    password,
    phone,
    gender: Joi.string().max(6).allow(''),
    address: Joi.string().max(100).allow(''),
  })
  const result = schema.validate(req.body)
  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    })
  }
  next()
}

export const emaiVerificationValidator = (req, res, next) => {
  const schema = Joi.object({
    otp: shortStr,
    email,
  })
  const result = schema.validate(req.body)
  if (result.error) {
    return res.json({
      status: 'error',
      message: result.error.message,
    })
  }
  next()
}
