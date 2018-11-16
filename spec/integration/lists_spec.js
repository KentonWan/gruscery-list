const request = require("request");
const server = require("../../server");
const base = "http://localhost:5000/lists/";
const List = require("../../src/db/models").List;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : lists", () => {

    beforeEach((done) => {
        this.list;
        sequelize.sync({force: true}).then((res) => {

            List.create({
                title: "Mommy's List",
                userId: 1
            })
            .then((list) => {
                this.list = list;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        })
    })

    describe("GET /lists", () => {
  
      it("should return a status code 200 and return all lists", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull
          done();
        });
      });
  
    });
  });