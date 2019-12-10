// sequelize logic written by Jake Wilder

module.exports = function (sequelize, DataTypes) {
  var Leaderboards = sequelize.define("Leaderboards", {
    player: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  return Leaderboards;
};