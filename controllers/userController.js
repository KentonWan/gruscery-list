const userQueries = require("../src/db/queries.users.js");
const passport = require("passport");


module.exports = {

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
                })
            }
        })
    }
}