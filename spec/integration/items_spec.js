const request = require("request");
const server = require("../../server");
const base = "http://localhost:5000/lists/";
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

const sequelize = require("../../src/db/models/index").sequelize;


describe("routes : items", () => {

    beforeEach((done) => {

        this.list;
        this.item;
        sequelize.sync({force: true}).then((res) => {

            List.create({
                title: "Mommy's List"
            })
            .then((list) => {
                this.list = list;

                Item.create({
                    description: "1 carton of milk",
                    purchased: false,
                    listId: this.list.id
                })
                .then((item) => {
                    this.item = item;

                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("POST /lists/:listId/items/create", () => {

        it("should create a new item", (done) => {
           const options = {
             url: `${base}${this.list.id}/items/create`,
             form: {
               description: "baby formula",
               purchased: false
             }
           };
           request.post(options,
             (err, res, body) => {
     
               Item.findOne({where: {description: "baby formula"}})
               .then((item) => {
                 expect(item).not.toBeNull();
                 expect(item.description).toBe("baby formula");
                 expect(item.purchased).toBe(false);
                 expect(item.listId).not.toBeNull();
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

      describe("POST /lists/:listId/items/:id/destroy", () => {

        it("should delete the item with the associated ID", (done) => {
   
   
          expect(this.list.id).toBe(1);
   
          request.post(`${base}${this.list.id}/items/${this.item.id}/destroy`, (err, res, body) => {
   
   
            Item.findById(1)
            .then((item) => {
              expect(err).toBeNull();
              expect(item).toBeNull();
              done();
            })
          });
   
        });
   
      });

      describe("POST /lists/:listId/items/:id/update", () => {
   
        it("should update the item with the given values", (done) => {
            const options = {
              url: `${base}${this.list.id}/items/${this.item.id}/update`,
              form: {
                description: "1 box mac and cheese",
                purchased: true
              }
            };
            request.post(options,
              (err, res, body) => {
   
              expect(err).toBeNull();
   
              Item.findOne({
                where: {id: this.item.id}
              })
              .then((item) => {
                  console.log
                expect(item.description).toBe("1 box mac and cheese");
                expect(item.purchased).toBe(true);
                done();
              });
            });
        });
   
      });
})