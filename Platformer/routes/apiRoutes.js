// api routes written by Jake Wilder

var db = require("../models");
var sequelize = require("sequelize");

module.exports = function (app) {


  // GET route for pulling all leaderboard data
  app.get("/api/leaderboards", function (req, res) {
    db.Leaderboards.findAll({
      order: [
        ['score', 'DESC']
      ]
    }).then(function (dbLeaderboards) {
      res.json(dbLeaderboards);
    });
  });

  // POST route for saving new leaderboards
  app.post("/api/leaderboards", function (req, res) {
    console.log(req.body);


    db.Leaderboards.create({
      player: req.body.player,
      score: req.body.score
    }).then(function (dbLeaderboards) {
      res.json(dbLeaderboards);
    });
  });

  // PUT route for updating leaderboard scores
  app.put("/api/leaderboards", function (req, res) {
    db.Leaderboards.update({
        score: req.body.score
      }, {
        where: {
          player: req.body.player
        }
      })
      .then(function (dbLeaderboards) {
        res.json(dbLeaderboards)
      })
      .catch(error);
  });
};