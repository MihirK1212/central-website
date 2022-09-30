import mongoose from 'mongoose'
import sectionChildSchema from './sectionchildren';

const sectionSchema = mongoose.Schema({
    sectionName : String,
    sectionID : Number,
    sectionHeader : String,
    sectionIcon : String,
    sectionFooter : String,
    sectionDescription : String,
    sectionTheme : String,
    visible : Boolean,
    sectionChildSequence : [ObjectId],
    sectionContent: [sectionChildSchema]
})

export default sectionSchema;


// history: [{userName:, resourceType: sectionChild, resourceId:, method:add|delete|update,previousObj, newObj}]