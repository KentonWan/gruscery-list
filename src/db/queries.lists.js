const List = require("./models").List;

module.exports = {

    getAllLists(callback) {
        return List.all()

        .then((lists) => {
            callback(null, lists)
        })
        .catch((err) => {
            callback(err);
        })
    },

    addList(newList, callback) {
        return List.create({
            title: newList.title
        })
        .then((list) => {
            console.log("list", list);
            callback(null, list)
        })
        .catch((err) => {
            callback(err);
        })
    }
}