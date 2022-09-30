import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    userName : String,
    userEmailId : String,
    currentVersion : ObjectId,
    publishedVersion : ObjectId,
})

const Users = mongoose.model('Users', userSchema);

export default Users;

