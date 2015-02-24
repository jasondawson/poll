var Express = require('express');
var Session = require('express-session');
var Passport = require('passport');
var BodyParser = require('body-parser');
var Mongoose = require('mongoose');
var env = require('./env.js');
var User = require('./api/controllers/UserController');
var Question = require('./api/controllers/QuestionController');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var port = 8080;
var mongoUri = '127.0.0.1:27034/polls';
var currentUser = {};

var isAuthed = function (req, res, next) {
  if (req.isAuthenticated()) { 
    currentUser = req.user;
  /*  console.log('authenticated:')
    console.log(currentUser.name)*/
    return next(); 
  }
  console.log('Not authenticated');
  res.status(401).end();
}

var app = Express();
app.use(Express.static(__dirname + '/public'));
app.use(BodyParser.json());
app.use(Session({
	secret: env.session_secret,
  saveUninitialized: true,
    resave: true
}));
app.use(Passport.initialize());
app.use(Passport.session());

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    next();
});

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
    callbackURL: env.googleCallbackURL
  },
  function(token, tokenSecret, profile, done){
    // Successful authentication, create or update user.
    User.updateOrCreate(profile).then(function(results){
      done(null, profile);
  }, function(err){
      done(err, profile);
  })
}));

Passport.use(new FacebookStrategy({
    clientID: env.FACEBOOK_APP_ID,
    clientSecret: env.FACEBOOK_APP_SECRET,
    callbackURL: env.facebookCallbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile);
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
    //console.log(req.user);
    currentUser = req.user;
    //console.log(currentUser);
    return res.redirect('/#/welcome');
    //res.status(200).json(req.user);
  });

app.get('/auth/facebook', Passport.authenticate('facebook'));
app.get('/auth/facebook/callback', Passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      console.log(req.user);
      currentUser = req.user;
      //console.log(currentUser);
      return res.redirect('/#/welcome');
    });


app.get('/auth/logout', function(req, res){
  req.logout();
  res.status(200).end();
});

app.get('/auth/currentUser', function(req, res) {
  if (req.user) {
  User.getUser(req.user.id).then(function(response) {
      /*console.log('currentUser api check:');
      console.log(req.user.name);*/
      res.status(200).json(response);
    });
  } else {
    res.end();
  }
});


//endpoints


app.get('/api/questions', isAuthed, Question.getQuestions);

app.put('/api/questions/:questionId/:answerIndex', isAuthed, Question.answerQuestion);


//for seed data and later
app.post('/api/questions', isAuthed, Question.addQuestion);




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