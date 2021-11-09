const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require ('../utils/auth');


router.get('/', async (req, res) => {
    try {
      
      const postData = await Post.findAll({
        attributes: ['id', 'title', 'body'],
        include: [
          {
            model: User,
            attributes: ['name'],
          }
        ],
      });

      const posts = postData.map((map) => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    // If user is logged in, redirect to homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/new', (req, res) => {
      res.render('new-post');
  });
  
  module.exports = router;