const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./models/Chat');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/idle", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useFindAndModify", false);

app.use(bodyParser.json());

require('./routes/chatRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});