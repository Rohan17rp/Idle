const db = require('../models');

// create group
module.exports.createGroup = async (req, res, next) => {
    try {
        let group = await db.Group.create({
            groupName: req.body.groupName,
        });
        group.users.push(req.params.user_id);
        await group.save();
        let foundUser = await db.User.findById(req.params.user_id);
        foundUser.groups.push(group.id);
        await foundUser.save();
        return res.status(200).json(group);
    } catch (err) {
        next(err);
    }
}

// get all groups
module.exports.getGroups = async (req, res, next) => {
    try {
        let user = await db.User.findById(req.params.user_id);
        console.log(user);
        return res.status(200).json(user.groups);
    } catch (err) {
        next(err);
    }
}

// Add a member
module.exports.addMember = async (req, res, next) => {
    try {
        let group = await db.Group.findById(req.params.group_id);
        let user = await db.User.findByUsername(req.body.username);
        console.log(group);
        console.log(req.body.username);
        console.log(user);
        if (user) {
            group.users.push(user.id);
            console
            await group.save();
            user.groups.push(group.id);
            await user.save();
        }
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports.sendMessage = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
}