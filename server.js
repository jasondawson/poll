var Express = require('express');
var Session = require('express-session');
var Passport = require('passport');
var BodyParser = require('body-parser');
var Mongoose = require('mongoose');
var env = require('./env.js');
var User = require('./api/controllers/UserController');
var Question = require('./api/controllers/QuestionController');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var FacebookStrategy = require(?).Strategy

var port = 8080;
var mongoUri = '127.0.0.1:27034/polls';


var isAuthed = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
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
  function(token, tokenSecret, profile, done){
    // Successful authentication, create or update user.
    User.updateOrCreate(profile).then(function(results){
      done(null, profile);
  }, function(err){
      done(err, profile);
  })
}));



//auth routes
app.get('/auth/google', Passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));
app.get('/auth/google/callback', Passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    //successful authentication redirect, redirect user to welcome screen.
    res.redirect('/#/welcome');
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//endpoints


app.get('/api/questions', isAuthed, Question.getQuestions);

//for seed data and later
//app.post('/api/questions', Question.addQuestion);




//connections

Mongoose.connect(mongoUri);
db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
})