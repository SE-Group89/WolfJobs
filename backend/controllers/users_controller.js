const User = require("../models/user");
//Render the user profile page
module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

// Render the sign-up page
module.exports.signUp = function(req,res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile'); // Redirect if the user is already signed up
    }


    return res.render('user_sign_up',{
        title: "WolfJobs | Sign Up"
    })
}

// Render the sign-in page
module.exports.signIn = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile'); // Redirect if user is already signed in
    }


    return res.render('user_sign_in',{
        title: "WolfJobs | Sign In"
    })
}

// Handle user registration
module.exports.create = function(req,res){

    if (req.body.password != req.body.confirm_password)
    {
        return res.redirect('back'); // Return to the form if passwords don't match
    }
    // Return to the form if passwords don't match
    User.findOne({email: req.body.email}, function(err,user){
        if (err)
        {
            console.log('Error in finding user in Signing Up');
            return;
        }

        if (!user)       // Create a new user
        {
            User.create(req.body, function(err,user){
                if(err)
                {
                    console.log('Error in creating a user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else
        {
            return res.redirect('back');
        }

    })



}

//Log In the user and create session for the user

module.exports.createSession = function(req,res){

    return res.redirect('/');

}
// Log out the user and destroy the session
module.exports.destroySession = function(req,res){

    req.logout();
    
    return res.redirect('/')
}