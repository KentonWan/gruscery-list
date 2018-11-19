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
                res.send("lists created")
            }
        });
    },

    getAllLists(req, res, next){

        listQueries.getAllLists((err, lists)=> {
            if(err){
              res.redirect(500, "/");
            } else {
              res.send({lists});
            }
          })
    },

    show(req, res, next){

             listQueries.getList(req.params.id, (err, list) => {
        
               if(err || list == null){
                 res.redirect(404, "/");
               } else {
                 res.send({list});
               }
            });
        }, 
    
    destroy(req, res, next){
        listQueries.deleteList(req.params.id, (err, topic) => {
            if(err){
            res.redirect(500, `/lists/${list.id}`)
            } else {
            res.redirect(303, "/lists/")
            }
        });
    }, 

    update(req, res, next) {

        listQueries.updateList(req.params.id, req.body, (err, list) => {
            if(err || list == null){
                res.redirect(404, `/lists/${req.params.id}/`);
              } else {
                res.send("updated name");
              }
        })
    }

}
