const mongoose = require('mongoose');
const Chat = mongoose.model('chat');

module.exports = (app) => {

  app.get('/api/chat', async (req, res) => {
    let chats = await Chat.find();
    return res.status(200).send(chats);
  });

  app.post('/api/chat', async (req, res) => {
    let chat = await Chat.create({
        name : "Harshal",                            
        message : req.body.message});
    return res.status(201).send({
      error: false,
      chat
    })
  })

  app.put('/api/chat', async (req, res) => {
    const {id} = req.params;

    let chat = await Chat.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      chat
    })

  });

  app.delete('/api/chat', async (req, res) => {
    const {id} = req.params;

    let chat = await Chat.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      chat
    })

  })

}