const express = require('express');
 const   app       = express();
const router = express.Router();

app.get('', (req, res) => {
    res.render("landing");
});

router.get('signin', (req, res, err) => {
    res.render('login');
})

module.exports = router;