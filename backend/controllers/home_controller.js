
// Controller function to render the home page
module.exports.home = function(req, res) {
    // Render the 'home' view with a title attribute
    return res.render('home', {
        title: "Home" // Pass a title variable to the view
    });
}
