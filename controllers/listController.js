const listQueries = require("../src/db/queries.lists.js");

module.exports = {
    
    index(req, res, next){
        res.send("Lists")
    },

    create(req, res, next) {
        let newList = {
            title: req.body.title
        };

        listQueries.addList(newList, (err, list) => {
            if(err){
                res.redirect(500, "/lists")
            } else {
                res.redirect(303, `lists/${list.id}`)
            }
        });
    }
}
