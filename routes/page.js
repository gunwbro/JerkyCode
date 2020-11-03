const express = require("express");

const router = express.Router();

router.get('/', (req,res,next) => {
    res.render('index', {
        title: 'Jerkyb',
    });
});

router.get('/profile', (req,res,next) => {
    res.render('profile', {
        title: 'Jerkyb',
    })
})
module.exports = router;