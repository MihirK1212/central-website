import mongoose from 'mongoose'
import sectionChildSchema from './sectionchildren';

const sectionSchema = mongoose.Schema({
    sectionName : String,
    sectionID : Number,
    sectionHeader : String,
    visible : Boolean,
    sectionDescription : String,
    sectionFooter : String,
    sectionIcon : String,
    sectionTheme : String,
    sectionChildSequence : [ObjectId],
    sectionContent: [sectionChildSchema]
})

export default sectionSchema;


// history: [{userName:, resourceType: sectionChild, resourceId:, method:add|delete|update,previousObj, newObj}]