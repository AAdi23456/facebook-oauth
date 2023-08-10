const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();


app.use(require('express-session')({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const FACEBOOK_APP_ID = '1117311832587930';
const FACEBOOK_APP_SECRET = '3e204cc512d0a22fbda611f6c7a9a01c';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'https://cute-teal-jellyfish-vest.cyclic.app/auth/facebook/callback'
  },
  (accessToken, refreshToken, profile, done) => {
  
    console.log(accessToken);
    console.log(profile);
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Set up routes for authentication
app.get('/auth/facebook', passport.authenticate('facebook',{scope: ['email', 'user_friends', 'user_posts']}
));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' })
);

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${req.user.displayName}!`);
  } else {
    res.send('Welcome! Please log in with Facebook.');
  }
});

app.listen(3000, () => {
  console.log('Server started on https://cute-teal-jellyfish-vest.cyclic.app');
});
