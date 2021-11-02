import mongoose from 'mongoose'

const ProfileSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: 'inactive',
    },
    fname: {
      type: String,
      required: true,
      default: '',
      maxLength: 30,
    },
    lname: {
      type: String,
      required: true,
      default: '',
      maxLength: 30,
    },
    dob: {
      type: Date,
      default: null,
    },
    email: {
      type: String,
      required: true,
      default: '',
      maxLength: 30,
      unique: true,
      index: 1,
    },
    isEmailConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
      default: '',
      minLength: 6,
    },
    address: {
      type: String,
      required: true,
      default: '',
      maxLength: 70,
    },
    phone: {
      type: String,
      default: '',
      maxLength: 15,
    },
    gender: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Client_Profile', ProfileSchema)
