const db = require("../models");

module.exports = function(app){
  //GET ALL checklist
  app.get("api/list", (req, res) => {
    console.log("test g all");
    db.Checklist.findAll({}).then(data => {
      res.status(200);
      res.json(data);
    });
  });

  //GET checklist item
  app.get("api/list/:id", (req, res) => {
    console.log("test get");
    let id = req.params.id;
    db.Checklist.findAll({ where: { id: req.params.id } }).then(data => {
      res.status(200);
      res.json(data);
    });
  });

  //POST checklist
  app.post("api/list", (req, res) => {
    console.log("check post");
    db.Checklist.create({
      body: req.body.body,
      //How should we pull user id for this?
      user_id: req.body.user
    }).then(data => {
      //May not need to return data, could call render here
      res.status(200);
      res.json(data);
    });
  });

  //UPDATE checklist
  app.put("api/list/:id", (req, res) => {
    console.log("check put");
    db.Checklist.update(
      {
        completed: 1,
        //Should below be a separate call? probably-prevent accidents.
        //Implement on page how?
        hidden: 1
      },
      {
        where: {
          id: id
        }
      }
    ).then(data => {
      //As above, res might be be better off changed post testing
      res.status(200);
      res.json(data);
    });
  });
};
