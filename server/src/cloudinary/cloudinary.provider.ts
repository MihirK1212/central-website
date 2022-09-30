/* eslint-disable prettier/prettier */

import * as cloudinaryPkg from 'cloudinary'

const cloudinary = cloudinaryPkg.v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

