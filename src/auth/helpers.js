const bcrypt = require("bcryptjs");

module.exports = {

    ensureAuthenitcated(req, res, next) {
        if(!req.user) {
            req.flash("notice", "You must be signed in to do that.")
        } else {
            next();
        }
    },

    comparePass(userPassword, databasePassword) {
        return bcrypt.compareSync(userPassword, databasePassword);
    }
}