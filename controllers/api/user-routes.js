const router = require('express').Router();
const { User } = require('../../models');

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
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are logged in.'});
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        // log out and delete data
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;