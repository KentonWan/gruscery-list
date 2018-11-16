const userQueries = require("../src/db/queries.users.js");
const passport = require("passport");


module.exports = {

    currentUser(req, res, next) {
        if(!req.user) {
            console.log("please sign in")
        } else {
            res.send({id: `${req.user.id}`});
        }
    },


    create(req, res, next){

        let newUser = {
            email: req.body.email,
            password: req.body.password
        };
        res.send("user created");

        userQueries.createUser(newUser, (err, user) => {
            if(err) {
                console.log(err);
            } else {

                passport.authenticate("local")(req, res, () => {
                    console.log("You've successfully signed in!");
                    res.redirect('/users/currentUser');
                })
            }
        })
    },

    signIn(req,res,next){
        passport.authenticate("local")(req,res, function () {
            if(!req.user) {
                console.log("sign in failed");
            } else {
                console.log("You've signed in successfully!")
                res.redirect('/users/currentUser')
            }
        })
    },

    signOut(req, res, next){
        req.logout();
        console.log("You've successfully signed out!")
    }
}