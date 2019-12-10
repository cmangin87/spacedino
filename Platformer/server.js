/* server logic written by Jake
  chat initialization written by Kevin */

var express = require('express');
var connection = require("./db/connection");
var apiRoutes = require("./routes/apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");

// Initialize the app and create a port

var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");
const http = require("http").Server(app)//chat
const io = require("socket.io")(http)//chat

// Set up body parsing, static, and route middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MOUNTING ROUTES

require("./routes/apiRoutes")(app);

// app.use(apiRoutes);
// app.use(htmlRoutes);

//Chat

io.on("connection", (socket) => {
  socket.username = "anonymous"
  socket.on("message", (msg) => io.emit("message", { "user": socket.username, "message": msg }))
  socket.on("join", (username) => {
      if (username != null) {
          socket.username = username
      }
      socket.broadcast.emit("message", { user: "Server", "message": socket.username + " has joined the server!"})
  })
})

//sequelize sync function

db.sequelize.sync().then(function() {
  http.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
