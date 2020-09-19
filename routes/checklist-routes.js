const db = require("../models");

module.exports = function(app) {
  //GET ALL checklist items
  app.get("/api/list", (req, res) => {
    db.Checklist.findAll({})
      .then(data => {
        //Currently returns list, may switch to res.render for HBS
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  //GET checklist item
  app.get("/api/list/:id", (req, res) => {
    db.Checklist.findAll({ where: { id: req.params.id } })
      .then(data => {
        //As above, could be res.render, or location.reload, or something else
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  //POST checklist item
  app.post("/api/list", (req, res) => {
    db.Checklist.create({
      //Assuming body.value is pulled from todo text entry field
      body: req.body.value,
      //How should we get user's id into body for this?
      user_id: req.body.user
    })
      .then(data => {
        //May not need to return data, also see above
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  //UPDATE checklist item as complete
  app.put("/api/list/:id", (req, res) => {
    const id = req.params.id;
    db.Checklist.update(
      {
        completed: 1,
        //Should below be a separate call/route (/complete)?
        //Might be difficult to reverse accidental 'deletion' otherwise.
        //If so: how to implement on page (and in backend)?
        hidden: 1
      },
      {
        where: {
          id: id
        }
      }
    )
      .then(data => {
        //As above, decide how to handle this code post testing/html dev
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });
};
