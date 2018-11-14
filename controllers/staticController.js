module.exports = {

    index(req, res, next){
        res.send("hello");
    },

    hello(req, res, next){
        res.send({express: 'Hello from Kenton'})
    },


}