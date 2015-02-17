var Express = require('express');
var Session = require('express-session');
var Passport = require('passport');
var BodyParser = require('body-parser');
var env = require('./env.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var FacebookStrategy = require(?).Strategy

var port = 8080;




var isAuthed = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

var app = Express();
app.use(Express.static(__dirname + '/public'));
app.use(BodyParser.json());
app.use(Session({
	secret: env.session_secret
}));
app.use(Passport.initialize());
app.use(Passport.session());

Passport.serializeUser(function(user, done) {
	//input user model (mongoose)
	done(null, user);
});
Passport.deserializeUser(function(obj, done) {
	//output object (json)
	done(null, obj);
});

Passport.use(new GoogleStrategy({
    clientID: env.clientID,
    clientSecret: env.clientSecret,
    callbackURL: env.callbackURL
  },
  function(token, tokenSecret, profile, done) {
  	console.log(profile);
    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });*/
	return done(profile);
  }
));



//auth routes
app.get('/auth/google', Passport.authenticate('google', {scope: 'profile'}));
app.get('/auth/google/callback', Passport.authenticate('google', { failureRedirect: '/#/main' }),
  function(req, res) {
    // Successful authentication, create or update user & then redirect home.
    //need # in route?
    console.log(res);
    res.redirect('/#/welcome');
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.listen(port, function() {
	console.log('Listening on port ' + port);
})