const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
    _id: Number,
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String, 
        default: null 
    },
    role: {
        type: String,
        enum: ['admin', 'teacher'],
        default: 'teacher'
    }
});






teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const bcrypt = require('bcrypt');
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});


teacherSchema.plugin(AutoIncrement, { id: 'teacher_seq', inc_field: '_id' });

module.exports = mongoose.model('Teacher', teacherSchema);
