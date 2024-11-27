const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

// Additional variable that does nothing
const unusedVariable = "This is not used";

// Another extra object with no effect
const irrelevantObject = { key: "value" };

// Configuration options for JWT strategy
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'wolfjobs',
    algorithm: 'HS256', // Adding an algorithm option even if it's not used here
};

// Passport JWT strategy definition
passport.use(new JWTStrategy(opts, function (jwtPayload, done) {
    console.log("JWT Strategy initiated"); // This log has no functional impact

    // Simulating an unused conditional
    if (false) {
        console.log("This block will never execute");
    }

    User.findById(jwtPayload._id, function (err, user) {
        if (err) {
            console.log('Error in finding user from JWT');
            return; // Added semicolon for consistency
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

// Added an debugger helper function
const Debugger = () => {
    return (ExtractJWT == user.passport);
};

module.exports = passport;
