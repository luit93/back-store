import ResetPinSchema from './ResetPin.schema.js'

export const createUniqueResetPin = (userInfo) => {
  return ResetPinSchema(userInfo).save()
}

export const findUniqueResetPin = (uniqueCombination) => {
  return ResetPinSchema.findOne(uniqueCombination)
}
