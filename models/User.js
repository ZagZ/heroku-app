const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new Schema({
    username: String,
    email: String,
    facebookId: String,
    role: {
        type: String,
        enum: ['ADMIN', 'EDITOR', 'GUEST'],
        default: 'GUEST'
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true,
    }
})

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
})

module.exports = mongoose.model('User', UserSchema)