const db = require("../models");

module.exports = function(app) {
  //GET ALL Likes items
  app.get("/api/likes", (req, res) => {
    db.Likes.findAll({
      where: {
        user_id: req.user.id,
        hidden: req.hidden
      }
    })

      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  //GET Likes item
  app.get("/api/likes/:id", (req, res) => {
    db.Likes.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  //POST Likes item
  app.post("/api/likes", (req, res) => {
    db.Likes.create({
      quote: req.quote,
      quote_author: req.quote_author,
      reflection: req.reflection,
      user_id: req.user.id
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  //UPDATE Likes item hide or unhide
  app.put("/api/likes/:id", (req, res) => {
    const id = req.params.id;
    db.Likes.update(
      {
        hidden: req.hidden
      },
      {
        where: {
          id: id
        }
      }
    )
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });
};
