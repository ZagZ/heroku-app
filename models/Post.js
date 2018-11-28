const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    body: String,
    tags: [{
        type: String
    }],
    cover: String,
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true,
    }

})


module.exports = mongoose.model('Post', PostSchema)