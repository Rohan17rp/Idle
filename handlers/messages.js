const db = require('../models');

module.exports.sendMessage = async (req, res, next) => {
    try {
        let msg = await db.Message.create({
            user: req.params.user_id,
            group: req.params.group_id,
            data: req.body.data
        });
        let grp = await db.Group.findById(req.params.group_id);
        await grp.messages.push(msg.id);
        await grp.save();
        res.redirect('/users/' + req.params.user_id + '/groups/' + req.params.group_id);
    } catch (err) {
        next(err);
    }
}