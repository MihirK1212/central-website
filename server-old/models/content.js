import mongoose from 'mongoose'
import sectionSchema from './sections.js'

const contentSchema = mongoose.Schema({

    userEmailId : String,
    contentVersion : Number,

    userDetails : {
        name : {type:String , required:true},
        logo : {type:String , required:true},
        socialMedia : {
          Instagram : { type : String, default: ""},
          LinkedIn : { type : String, default: ""},
          Facebook : { type : String, default: ""},
          Discord : { type : String, default: ""},
        }
    },

    homePagePoster : {
        src : { type : String, default: ""},
        caption : { type : String, default: ""}
    },

    contactDetails : {
        email : String,
        phoneNumber : Number
    },

    sectionSequence : [ObjectId],

    themeDetails : String,

    Sections : [sectionSchema]
})

export default contentSchema;
