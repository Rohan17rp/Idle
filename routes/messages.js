const express = require('express');
const router  = express.Router({ mergeParams: true });
// const { getGroups, createGroup, addMember } = require('../handlers/groups');
const { sendMessage } = require('../handlers/messages');

router
    .route('/')
    .get() // get all group messages
    .post(sendMessage) // send a message to the group

router
    .route('/:message_id')
    
    
module.exports = router;