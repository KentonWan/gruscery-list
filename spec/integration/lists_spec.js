const request = require("request");
const server = require("../../server");
const base = "http://localhost:5000/lists/";
const List = require("../../src/db/models").List;
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : lists", () => {

    beforeEach((done) => {
        
        this.user;
        this.list;
        sequelize.sync({force: true}).then((res) => {

            User.create({
                email: "email@email.com",
                password: "password"
            })
            .then((user) => {
                this.user = user;

                List.create({
                    title: "Mommy's List",
                    userId: this.user.id
                })
                .then((list) => {
                    this.list = list;
                    done();
                })
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

    describe("POST /lists/create", () => {
        const options = {
            url: `{base}create`,
            form: {
                title: "Daddy's List",
                userId: this.user.id
            }
        };

        it("should create a new list and redirect", (done) => {

            request.post(options, (err, res, body) => {
                List.findOne({where: {title: "Daddy's List"}})
                .then((list) => {
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