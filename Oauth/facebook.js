const express = require('express');
const passport = require('passport');
let fbid=""
const User=require("../models/users")
const route = express.Router();



var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: "1768134096956034",
  clientSecret: "1b87b054228da170aa0f87a201173a94",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
async (accessToken, refreshToken, profile, cb) => {
  console.log(profile._json.name);
  const picture = profile._json.picture || null;
  
  try {
      const newUser = {
          Name: profile.displayName,
        
          Oauthid: profile._json.id
      };

      const user = await User.create(newUser);
      console.log(user);
      return cb(null, user);
  } catch (err) {
      console.error(err);
      return cb(err, null);
  }
}
));

route.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] }));


route.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  function (req, res) {

   
  });


route.get('/verify', (req, res) => {
return res.status(200).json({Oauthid:fbid})
});

module.exports = route