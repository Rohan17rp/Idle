const mongoose = require('mongoose');
const Group     = require('./group');

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    data: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

messageSchema.pre('remove', async function(next) {
    try {
        let foundGroup = await Group.findById(this.group);
        foundGroup.messages.remove(this.id);
        await foundGroup.save();
        return next();
    } catch (err) {
        return next(err);
    }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;