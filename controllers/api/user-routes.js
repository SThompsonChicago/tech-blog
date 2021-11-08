const router = require('express').Router();
const { User } = require('../../models');


// Add new user to database
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Log in
router.post('/login', async (req, res) => {
    try {
        // Look for email in database matching input from user when they attempt to log in
        const userData = await User.findOne({ where: { email: req.body.email }});

        if (!userData) {
            res
                .status(400)
                .json({ message: 'No user found matching this login data.'});
            return;
        }

        // Create Boolean value to indicate whether password is correct
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'No user found matching this login data'});
            return;
        }

        // Maintain user data in sessin storage
        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({ user: userData, message: 'You are logged in.'})
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        // log out and delete data
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;