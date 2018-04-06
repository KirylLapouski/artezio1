var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose model
var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    city: String,
    facebookId: String,
    linkedinId: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;