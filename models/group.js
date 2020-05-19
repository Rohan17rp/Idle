const mongoose = require('mongoose');
// const user     = require('./user');
// const message   = require('./message');

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
}, {
    timestamps: true
});

// groupSchema.pre('save', async function(next) {
//     try {
//         let user = await group.findById(this.group);
//         group.messages.remove(this.id);
//         await group.save();
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// })


// groupSchema.pre('remove', async function(next) {
//     try {
//         let chmeat = await group.findById(this.group);
//         group.messages.remove(this.id);
//         await group.save();
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// })

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;