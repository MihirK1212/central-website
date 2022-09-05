import mongoose from 'mongoose'

const sectionChildSchema = mongoose.Schema({
    sectionChildName : String,
    sectionChildImage : String,
    sectionChildShortDesc : String,
    sectionChildDesc : String,
    sectionChildLinks : [String],
    visible : Boolean
})

export default sectionChildSchema;
