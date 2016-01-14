var Express = require('express');
var Session = require('express-session');
var Passport = require('passport');
var CookieParser = require('cookie-parser');
var BodyParser = require('body-parser');
var Mongoose = require('mongoose');
var env = require('./env.js');
var User = require('./api/controllers/UserController');
var Question = require('./api/controllers/QuestionController');
var Profile = require('./api/controllers/ProfileController');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var port = process.env.EXPRESS_PORT || 8080;
var mongoUri = '127.0.0.1/polls';
var currentUser = {};

var isAuthed = function (req, res, next) {
  if (req.isAuthenticated()) {
    //console.log(req);
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
app.use(CookieParser());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(Session({
	secret: process.env.SESSION_SECRET || env.session_secret,
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
    clientID: (process.env.googleClientId || env.googleClientID),
    clientSecret: (process.env.googleClientSecret || env.googleClientSecret),
    callbackURL: (process.env.googleCallbackURL || env.googleCallbackURL),
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done){
    // Successful authentication, create or update user.
    User.updateOrCreate(profile).then(function(results){
      //console.log(req.session);
      done(null, profile);
  }, function(err){
      done(err, profile);
  })
}));

/*Passport.use(new FacebookStrategy({
    clientID: env.FACEBOOK_APP_ID,
    clientSecret: env.FACEBOOK_APP_SECRET,
    callbackURL: env.facebookCallbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    // Successful authentication, create or update user.
      //console.log(profile);
    User.updateOrCreate(profile).then(function(results){

        req.login(profile, function(err) {
        if (err) {
          return done(err, profile);
        }
        console.log('Should be logged in');
      });
      //console.log(req.session.passport.user);
      done(null, profile);
  }, function(err){
      done(err, profile);
  })
}));*/

/*var middle = function(req, res, next){
  console.log(req.session);
  console.log(req.user)
  next();
}*/



//auth routes
app.get('/auth/google', Passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));
app.get('/auth/google/callback', Passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    //console.log(req.session);
    //console.log(req.isAuthenticated());
    //successful authentication redirect, redirect user to welcome screen.
    User.getUser(req.user.id).then(function(userProfile) {
    currentUser = userProfile;
    })
    //console.log(currentUser);
    return res.redirect('/#/welcome');
    //res.status(200).json(req.user);
  });


// app.get('/auth/facebook', Passport.authenticate('facebook'));
// app.get('/auth/facebook/callback', Passport.authenticate('facebook', { failureRedirect: '/' }),
//   function(req, res) {
//     //console.log(req.session);
//     //console.log(req.isAuthenticated());
//     //successful authentication redirect, redirect user to welcome screen.
// /*    console.log('req.user: ');
//     console.log(req.user);*/
//     User.getUser(req.user.id).then(function(userProfile) {
//     currentUser = userProfile;
//     })
//     //console.log(currentUser);
//     return res.redirect('/#/welcome');
//     //res.status(200).json(req.user);
//   });

// /*,
//     function(req, res) {
//       console.log(req.user);
//       req.login(req.user, function(err) {
//         if (err) {
//           //console.log(err);
//           return next(err);
//         }
//         currentUser = req.user;
//         return res.redirect('/#/welcome');
//       });
//       //console.log(req.user);
//      /* currentUser = req.user;
//       console.log(currentUser);
//       return res.redirect('/#/welcome');
//     })*/


app.get('/auth/logout', function(req, res){
  req.logout();
  currentUser = {};
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

app.get('/api/profile', isAuthed, function(req, res) {
  User.getUserProfile(req.user.id)
    .then(function(result) {
      res.status(200).json(result);
    });
  });

app.put('/api/profile', isAuthed, Profile.updateProfile);


app.post('/api/questions', isAuthed, Question.addQuestion);

app.get('/api/getEnv', function (req, res) {
    var env = process.env.NODE_ENV || 'development';
    res.status(200).json(env);
})

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
