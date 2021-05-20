const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
var Schema=mongoose.Schema;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('blogs', blogSchema)


