require('dotenv').config();
const express     = require('express'),
    app           = express(),
    router        = express.Router(),
    server        = require('http').Server(app),
    io            = require('socket.io')(server),
    bodyParser    = require('body-parser'),
    errorHandler  = require('./handlers/error'),
    authRoutes    = require('./routes/auth'),
    groupRoutes   = require('./routes/groups'),
    messageRoutes = require('./routes/messages'),
    tempRoutes    = require('./routes/temps');
    db            = require('./models');

PORT = 8081;

app.use(bodyParser.json());

// ************************************************************
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
// ************************************************************
// ============================================================

app.get('/', (req, res) => {
    res.render("landing");
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/users/:user_id', async (req, res) => {
    let user = await db.User.findById(req.params.user_id).populate('groups', {
        groupName: true
    });
    // const groups = new Array();
    // await user.groups.forEach(async (group) => {
    //     let foundGroup =  await db.Group.findById(group).populate('Group', {
    //         groupName: true
    //     });
    //     // await console.log(foundGroup);
    //     await groups.push(foundGroup);
    //     console.log("====================================================");
    //     console.log(groups);
    //     console.log("====================================================");
    // })
    res.render('user/index', { user_id:req.params.user_id, groups: user.groups });
});

app.get('/users/:user_id/groups/:group_id', async (req, res) => {
    let group = await db.Group.findById(req.params.group_id).populate('messages', {
        user: true,
        data: true
    })
    res.render('user/group', { user_id: req.params.user_id, group: group});
})
// ============================================================

app.use('/api/auth', authRoutes);

app.use('/api/users/:user_id/groups', groupRoutes);

app.use('/api/users/:user_id/groups/:group_id/messages/', messageRoutes);

app.use((req, res, next) => {
    let err = new Error("Page Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

io.on('connection', (socket) => {
    console.log("user is connected");
});

app.listen(PORT, () => {
    console.log("[*] Idle server listening on port " + PORT);
})