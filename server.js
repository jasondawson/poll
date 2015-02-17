var Express = require('express');
var Session = require('express-session');
var Passport = require('passport');
var BodyParser = require('body-parser');
var env = require('./env.js');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;


var port = 8080;


//var FacebookStrategy = require(?).Strategy
Passport.serializeUser(function(user, done) {
	//input user model (mongoose)
	done(null, user);
});
Passport.deserializeUser(function(obj, done) {
	//output object (json)
	done(null, obj);
});



var app = Express();
app.use(Express.static(__dirname + '/public'));
app.use(BodyParser.json());
app.use(Session({
	secret: 'sdf0sd8ggsdasdg8as80asdf'
}));
app.use(Passport.initialize());
app.use(Passport.session());


/* passport.use 
	-strategies
		-facebook
		-google
*/
Passport.use(new GoogleStrategy({
    consumerKey: env.GOOGLE_CONSUMER_KEY,
    consumerSecret: env.GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));



//auth routes


app.listen(port, function() {
	console.log('Listening on port ' + port);
})