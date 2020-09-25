// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

//Require models to access db
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/main");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/main", isAuthenticated, (req, res) => {
    db.Quote.findOne({
      attributes: ["quote_body", "quote_author", "image_url"],
      order: [["id", "DESC"]]
    }).then(data => {
      //const url = data.dataValues.image_url.replaceAll("/", "&#x2F");
      //const url = data.dataValues.image_url.split("/");
      res.render("index", {
        quote: data.dataValues.quote_body,
        author: data.dataValues.quote_author,
        //image: url[0],
        //image1: url[1],
        //image2: url[2],
        //image3: url[3],
        //image4: "/"
        url: data.dataValues.image_url
      });
    });
  });

  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
    next();
  });
};
