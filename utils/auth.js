const withAuth = (req, res, next) => {
    // if user is not yet logged in, redir the req to login route:
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;