const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['id', 'title', 'body'],
        });

        const posts = dbPostData.map((map => this.post.get({ plain: true })));
        res.render('profile', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
    res.render('new-post');
})

module.exports = router;