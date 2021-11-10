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

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
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

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['[password']}
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: [
                'id',
                'title',
                'content'
            ]
        }]
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({ message: 'User not found.'});
            return;
        }
        res.json(userData);
    });
});

module.exports = router;