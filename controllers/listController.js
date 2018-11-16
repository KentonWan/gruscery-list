const listQueries = require("../src/db/queries.lists.js");

module.exports = {
    
    index(req, res, next){
        res.send("Lists")
    },

    getAllLists(req,res, next){

        listQueries.getAllLists ((err, lists) => {

            if(err) {
                res.redirect(500, "/" )
            } else {
                res.send({lists})
            }
        })

    }
}