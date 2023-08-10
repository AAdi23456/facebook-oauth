var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const express = require('express');
const app = express();
passport.use(new GoogleStrategy({
    clientID: "733641308026-i84a56jbuvtdd0p9k16mb2hv6jt5l1mj.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    return
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //     console.log(user);
    //     console.log(err);
    //   return cb(err, user);
    // });
  }
));
app.get('/auth/google',
passport.authenticate('google', { scope: ['profile', 'email', 'phone'] }));


app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  app.get("/",(req,res)=>{
    res.json("waha wah")
  })
  app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
  });
  