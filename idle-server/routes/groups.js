const express = require('express');
const router  = express.Router({ mergeParams: true });
const { getGroups, createGroup, addMember } = require('../handlers/groups');

// /api/user/:user_id/groups
// /api/user/:user_id/groups ==> view groups
// /api/user/:user_id/groups ==> create groups
// /api/user/:user_id/groups/:group_id => add a member
// /api/user/:user_id/groups/:group_id/messages ==> view messages in grp
// /api/user/:user_id/groups/:group_id/messages ==> send msg in grp
// /api/user/:user_id/groups/:group_id/messages/:message_id ==> all about messages

router
    .route('/')
    .get(getGroups) // get all groups info
    .post(createGroup) // create a new group

router
    .route('/:group_id')
    .post(addMember) // add a member
    .delete() // leave group

router
    .route('/:group_id/messages')
    .get() // get all group messages
    .post() // send a message to the group

router
    .route('/:group_id/messages/:message_id')
    
    
module.exports = router;