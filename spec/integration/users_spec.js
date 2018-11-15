const request = require("request");
const server = require("../../server");
const base = "http://localhost:5000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {

    beforeEach((done) => {

        sequelize.sync({force: true})
        .then(() => {
            done();
        })
        .catch((err) => {
            console.log(err);
            done();
        });
    });

    describe("POST /users", () => {
        it("should create a new user with valid values and redirect", (done) => {

            const options = {
                url: "http://localhost:5000/users/new",
                form: {
                    email: "user@example.com",
                    password: "1234567890"
                }
            }

            request.post(options, (err, res, body) => {

                User.findOne({where: {email: "user@example.com"}})
                .then((user) => {
                    expect(user).not.toBeNull();
                    expect(user.email).toBe("user@example.com");
                    expect(user.id).toBe(1);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
            });
        });

        it("should not create a new user with invalid attributes and redirect", (done) => {
            request.post(
              {
                url: "http://localhost:5000/users/new",
                form: {
                  email: "no",
                  password: "123456789"
                }
              },
              (err, res, body) => {
                User.findOne({where: {email: "no"}})
                .then((user) => {
                  expect(user).toBeNull();
                  done();
                })
                .catch((err) => {
                  console.log(err);
                  done();
                });
              }
            );
          });
      
    });
})