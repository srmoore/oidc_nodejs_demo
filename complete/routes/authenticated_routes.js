module.exports = function(app, passport) {
    app.get('/login', passport.authenticate('oidc'));

    // OIDC Callback
    app.get('/openid-connect-login', passport.authenticate('oidc', {successRedirect:'/profile', failureRedirect:'/'}));

    app.get('/profile', isLoggedIn, function(req, res){
        console.log("In profile");
        res.render('profile', {title: 'Express - profile', user: req.user.name}); // TODO: add profile info here
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("Is authenticated");
        return next();
    }
    console.log("Not Authenticated");
    res.redirect('/');
}