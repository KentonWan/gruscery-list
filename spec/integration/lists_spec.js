const request = require("request");
const server = require("../../server");
const base = "http://localhost:5000/lists/";
const List = require("../../src/db/models").List;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : lists", () => {

    // beforeEach((done) => {
        
        this.list;
        sequelize.sync({force: true}).then((res) => {

                List.create({
                    title: "Mommy's List",
                })
                .then((list) => {
                    this.list = list;
                    done();
                })
                .catch((err) => {
                console.log(err);
                done();
            })
        });

    describe("GET /lists", () => {
  
        it("should return a status code 200", (done) => {
            request.get(base, (err, res, body) => {
              expect(res.statusCode).toBe(200);
              done();
            });
          });
      
        });

    describe("POST /lists/create", () => {
        const options = {
            url: "http://localhost:5000/lists/create",
            form: {
                title: "Daddy's List",
            }
        };

        it("should create a new list and redirect", (done) => {

            request.post(options, (err, res, body) => {
                List.findOne({where: {title: "Daddy's List"}})
                .then((list) => {
                    console.log("list", list)
                    expect(res.statusCode).toBe(200);
                    expect(list.title).toBe("Daddy's List");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
            })
        })
    })
  });