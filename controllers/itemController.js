const itemQueries = require("../src/db/queries.items.js");


module.exports = {

    getItems(req, res, next) {

        itemQueries.getItems(req.params.listId, (err, items) => {
            if(err) {
                res.redirect(500, `/lists/${req.params.listId}/`)
            } else {
                res.send({items})
            }
        })

    },

    create(req, res, next) {

        let newItem = {
            description: req.body.description,
            purchased: req.body.purchased,
            listId: req.params.listId
        };

        itemQueries.addItem(newItem, (err, list) => {
            if(err) {
                res.redirect(500,"/lists/")
            } else {
                res.send("item added")
            }
        })
    }, 

    destroy(req, res, next){

        itemQueries.deleteItem(req.params.id, (err, deletedRecordsCount) => {
            if (err) {
                res.redirect(500, `/lists/${req.params.listId}/`)
            } else {
                res.send("item deleted");
            }
        })
    }, 

    update(req, res, next) {
        itemQueries.updateItem(req.params.id, req.body, (err, item) => {
            if(err || item == null) {
                res.redirect(404, `/lists/${req.params.listId}/`);
            } else {
                res.send("item updated");
            }
        })
    }

};