require('dotenv').config();
const express      = require('express');
const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http);
const bodyParser   = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes   = require('./routes/auth');
const groupRoutes  = require('./routes/groups');


PORT = 8081;

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use('/api/users/:user_id/groups', groupRoutes);

app.use((req, res, next) => {
    let err = new Error("Page Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});

http.listen(PORT, () => {
    console.log("[*] Idle server listening on port " + PORT);
})