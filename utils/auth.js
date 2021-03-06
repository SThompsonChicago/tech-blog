const withAuth = (req, res, next) => {
    // If not logged in, redirect user to login page
    if(!req.session.logged_in) {
        res.redirect('/login');
    } else {
        // If user is authenticated, call next
        next();
    }
};

module.exports = withAuth;