const router = require('express').Router();

const withAuth = require ('../utils/auth');

// Handle GET request to homepage
router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            galleries,
            loggedIn: req.session.loggedIn,
          });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Handle GET request to login page
router.get('/login', (req, res) => {
    //redirect to homepage if logged in
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;