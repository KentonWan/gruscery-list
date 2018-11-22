
# GR'US'CERY LIST

![Screenshot of Homepage](https://i.imgur.com/zPY3Pao.png)

https://gruscery-list.herokuapp.com/

A grocery list web app that can be shared in real-time with other users.  Users are able to create shopping lists with a list of items that can be updated, deleted and mark as purchased. Built with React.js and Node.js using TDD and RESTful API and Postgres for data management. 

## Getting Started

To get you started you can first clone the repository to your local machine: 

```
$ git clone https://github.com/KentonWan/gruscery-list.git

```

Also decide whether you will use `yarn` or `npm`.  My preference is `npm` and what the app was built on.  

### Prerequisites

To run, first make sure you have Node installed. You can type `node -v` to find your version:

```
$ node -v 
v8.11.2
```
If you do not have Node installed. You can download from their website: https://nodejs.org/en/download/ or you can install via Homebrew (need to install Homebrew first fo course). Here's a link to a guide: https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew

You will also need to have Postgres installed on your computer for the data management.  I recommend installation via homebrew.  Here's a link: https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3

Please look at `package.json` file for all dependencies that you will need to install.  For example you will need *concurrently* which can be installed via npm: 

```
$ npm i concurrently
```

See deployment for notes on how to deploy the project on a live system.

### Installing

Once you have cloned and downloaded all necessary dependencies. You will need to create a `.env` file for your environmental variables. For example, the `secret` for the `express-session` middleware will be securely stored there.  Ensure that `.env` is listed in your .gitignore file. 

**main-config.js**

```
app.use(session({
            secret: "process.env.Secret",
            resave: false,
            saveUninitialized: false,
            cookie: {maxAge: 1.21e+9}
        }));
```

Once the repository has been cloned, all dependencies installed, your database created and `.env` file created properly you can then run the app developmentally on your machine.

```
$ npm run dev
```
It should appear on http://localhost:3000.  

![Screenshot including address](https://i.imgur.com/S0U3MGe.png)

Create a user by signing up in top right screen. Then click on the `Gr'us'cery Lists` link in the top right of the page

![Gr'us'cery Lists](https://i.imgur.com/rCLu2ix.png)

You will then see a list of grocery lists you can choose from as well as create your own. 

![Lists of gr'us'cery lists](https://i.imgur.com/lEJOkB0.png)

Click on one and you will see the option to change the title of the gr'us'cery list as well as delete it.  You will also see a list of items on the list with the functionality to add an item, update the item, mark an item as purchased/unpurchased and delete an item. 

![Item](https://i.imgur.com/0o7rcb0.png)

## Running the tests

Test-Driven Development(TDD) was used in building this app utilizing Jasmine (https://jasmine.github.io/). All the tests can be found in the `/client/spec` file. Unit and integration tests were written for the different models with CRUD operations in mind.  From the command line you can use `npm test {test file pathway` to test. 

```
$ npm test ./client/src/spec/integration/lists_spec.js
```

### Example

The unit tests test that each respective model is created properly as well as proper relationships with other models if applicable.  

The integration tests for all the CRUD operations for each respective model. Below is an example for the `lists_spec` file. 

```
describe("routes : lists", () => {

    beforeEach((done) => {
        
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
    });

    describe("GET /lists/:id", () => { //GET request for a specific list

        it("should render a view with the selected list", (done) => {
          request.get(`${base}${this.list.id}`, (err, res, body) => {
            expect(err).toBeNull();
            done();
          });
        });
   
      });

    describe("POST /lists/create", () => {  //POST request to create a new list
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
                    expect(list.title).toBe("Daddy's List");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
            })
        })
    }
    
    );
```

## Deployment

The owner deployed the app using Heroku, but you are free to use your preference. 

For Heroku, head over to Heroku and log in (or open an account if you don’t have one).

Create a new app and give it a name

![Create a new app](https://i.imgur.com/QSZwYOR.png)

Click into the **Deploy** tab and there you will find instructions how to deploy the app

![Deploy Tab](https://i.imgur.com/tqufBT5.png)

![Deploy Instructions](https://i.imgur.com/Mu5Q8OZ.png)

You will also need to install **Postgres** for your deployed app. So click on **Overview** and then *Configure Add-ons*

![Configre Add-ons](https://i.imgur.com/r2qH07C.png)

Type in *Postgres* and *Heroku Postres* should come up and add it on. 

![[Heroku Postgres](https://i.imgur.com/VEx5Ay3.png)]

Finally you will also need to add in your environmental variables stored in the `.env` file which does not get pushed up. Click on **Settings** and then on the *Reveal Config Var* button.  Add in your respective config variables like NODE_ENV, secret and your DATABASE_URL which is added when you add Heroku Postgres. 

![Config Vars](https://i.imgur.com/HkXYY53.png)

## Built With

* [React](https://reactjs.org/) - The front-end library
* [Node](https://nodejs.org/en/) - Javascript runtime for server-side management
* [Postgresql](https://www.postgresql.org/) - For database management

## Author

* **Kenton Wan** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)


## Acknowledgments

* Esau Silva who provided the basic structure for the application (https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0)


