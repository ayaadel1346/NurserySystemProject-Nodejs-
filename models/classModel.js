const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const classSchema = new mongoose.Schema({
    _id: Number, 
    name: { type: String, unique: true, required: true },
    supervisor: { type: Number, ref: 'Teacher' }, 
    children: [{ type: Number, ref: 'Child' }] 
});


classSchema.plugin(AutoIncrement, { id: 'class_seq', inc_field: '_id' });

module.exports = mongoose.model('Class', classSchema);