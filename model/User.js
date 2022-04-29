const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
        email: { type: String, unique:true, required: true },
        userName: { type:String, unique:true, require: true },
        password:  { type:String, unique:true, require: true },
        firstName: { type:String, unique:true },
        lastName: { type:String, unique:true }
})

module.exports = mongoose.model('User', userSchema);
