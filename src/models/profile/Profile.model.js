import ProfileSchema from './Profile.schema.js'

export const createProfile = (newProfile) => {
  return ProfileSchema(newProfile).save()
}
export const activateProfile = (email) => {
  return ProfileSchema.findOneAndUpdate(
    { email },
    { status: 'active' },
    { new: true }
  )
}
