DROP DATABASE IF EXISTS leaderboards_db;

CREATE DATABASE leaderboards_db;

USE leaderboards_db;

CREATE TABLE leaderboards
(
  id INT NOT NULL AUTO_INCREMENT,
  player VARCHAR(35) NOT NULL,
  score INTEGER(10) NOT NULL,
  PRIMARY KEY(id)
);

SELECT * FROM leaderboards;