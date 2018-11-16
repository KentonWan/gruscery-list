const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const User = require("../../src/db/models").User;



describe("List", () => {


    beforeEach((done) => {

        this.user
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
    });

    describe("#create()", () => {

        it("should create a list with title and userId", (done) => {

            List.create({
                title: "Daddy's List",
                userId: this.user.id
            })
            .then((list) => {
                
                expect(list.title).toBe("Daddy's List");
                expect(list.userId).toBe(1);
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });

        it("should not create a list without a title or userId", (done) => {

            List.create({
                title: "Mason's List"
            })
            .then((list) => {

                done();
            })
            .catch((err)=> {
                expect(err.message).toContain("List.userId cannot be null");
                done();
            });
        });
    });
});