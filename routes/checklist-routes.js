const db = require("../models");

module.exports = function(app){
  //GET ALL checklist
  app.get("api/list", (req, res) => {
    console.log("test g all");
  });

  //GET checklist item
  app.get("api/list/:id", (req, res) => {
    console.log("test get")
  });

  //POST checklist
  app.post("api/list", (req, res) => {
    console.log("check post");
  });

  //UPDATE checklist
  app.put("api/list/:id", (req, res) => {
    console.log("check put");
  });
};
