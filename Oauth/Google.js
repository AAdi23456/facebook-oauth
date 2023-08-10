var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const express = require('express');
const Router = express.Router();
const User = require("../models/users")
passport.use(new GoogleStrategy({
    clientID: "733641308026-i84a56jbuvtdd0p9k16mb2hv6jt5l1mj.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    (accessToken, refreshToken, profile, cb) => {
        console.log(profile._json.name);
        const picture = profile._json.picture || null;
        User.create({
            Name: profile._json.name,
            Email: profile._json.email,
            picture: picture
        }, (err, user) => {
            if (err) {
                console.error(err);
                return cb(err, null);
            }
            console.log(user);
            return cb(null, user);
        });
    }
));

Router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

Router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });
Router.post("/sendotp")