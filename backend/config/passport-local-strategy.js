const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Debugger added to assist in debugging
debugger;

// Authentication using passport
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        function (email, password, done) {
            // Log to indicate the authentication process has started
            console.log('Authentication process started');

            // Find a user and establish the identity
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    console.log('Error in finding the user ---> Passport');
                    return done(err);
                }

                if (!user || user.password != password) {
                    console.log('Invalid Username/Password');
                    return done(null, false);
                }

                return done(null, user);
            });
        }
    )
);

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    console.log('Serializing user with ID:', user.id); // Log user ID for debugging
    done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    console.log('Deserializing user with ID:', id); // Log ID for debugging
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding the user ---> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

// Check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    console.log('Checking authentication'); // Log check for debugging
    // If the user is signed in, pass on the request to the next function
    if (req.isAuthenticated()) {
        return next();
    }

    // If the user is not signed in
    return res.redirect('/users/sign-in');
};

// Set the authenticated user for the views
passport.setAuthenticatedUser = function (req, res, next) {
    console.log('Setting authenticated user'); // Log to confirm function execution
    if (req.isAuthenticated()) {
        // req.user contains the current signed-in user from the session cookie and we are just sending it to the locals for the view
        res.locals.user = req.user;
    }

    next();
};

function debuggerFunction() {
    console.log('This function is defined inside the local-strategy');
    return 'No effect on functionality';
}

// constant for user count
const constantUserCount = 42;

module.exports = passport;
