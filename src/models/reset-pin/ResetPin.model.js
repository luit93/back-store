import ResetPinSchema from './ResetPin.schema.js'

export const createUniqueResetPin = (userInfo) => {
  return ResetPinSchema(userInfo).save()
}

export const findUniqueResetPin = (uniqueCombination) => {
  return ResetPinSchema.findOne(uniqueCombination)
}

export const deleteUniqueResetPin = async (uniqueCombination) => {
  const result = await ResetPinSchema.findOneAndDelete(uniqueCombination)
  return result
}
