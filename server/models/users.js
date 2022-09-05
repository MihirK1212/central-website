import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    userName : String,
    userEmailId : String,
    publishedVersion : ObjectId,
    contentVersions : [ObjectId]
})

const Users = mongoose.model('Users', userSchema);

export default Users;

