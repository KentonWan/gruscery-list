require("dotenv").config();
const path = require("path");
const cookierParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport_config");

module.exports = {
  init (app, express) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname,"..","assets")));
    app.use(session({
      secret: "process.env.cookieSecret",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 }
    }));
    app.use(flash());
    passportConfig.init(app);
    app.use((req,res,next)=> {
      res.locals.currentUser = req.user;
      next();
    })
  }
};
