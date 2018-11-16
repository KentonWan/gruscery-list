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
    }
}