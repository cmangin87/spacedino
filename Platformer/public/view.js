
/* Database/ORM front end written by Jake Wilder
    debugged by Jake & Kevin */

    $(document).ready(function () {
    var $newChatInput = $("#chatInput");
    var $scoreContainer = $("#score");
    var $playerInput = $("#player").val();
    var $playerScore = $("#playerScore");



    window.onload = getLeaderboards();

    // GET request function to pull leaderboards table data
    
    function getLeaderboards() {
        console.log('getLeaderboards()');
        $.get("/api/leaderboards", function (data) {
            console.table(data);
            initializeTable(data);
        });
    }

    // dynamic table function
    
    function initializeTable(leaderboards) {
        console.log('initializeTable()');
        $("#score").empty();
        console.log(leaderboards);

        // for loop to create and populate new table rows
        
        for (var i = 0; i < leaderboards.length; i++) {
            
            //createNewRow(leaderboards[i]);
            
            var $newInputRow = 
                    "<tr class='display score-item'><td>" +
                    (i + 1) +
                    "</td><td>" +
                    leaderboards[i].player +
                    "</td><td>" +
                    leaderboards[i].score +
                    "</td></tr>";
            console.log(leaderboards[i]);
            console.log($newInputRow);
        
            //$newInputRow.data("leaderboards", leaderboards);
            $scoreContainer.append($newInputRow);
        }
    }

    //function createNewRow(leaderboards) {
    //}

    // pushes player data to database
    function insertLeaderboards(event) {
        console.log('insertLeaderboards()');
        event.preventDefault();
        var leaderboards = {
            player: $playerInput.val().trim(),
            score: $playerScore
        };

        $.post("/api/leaderboards", leaderboards, getLeaderboards);
        $playerInput.val("");
        $playerScore.val();
    }



/* ---------- Chat Room ---------- 
    code written by Kevin Darcy */

var socket = null;
var app = new Vue({
    el: "#app",
    data: {
        message: "",
        messages: [],
        username: "",
        state: 0
    },
    methods: {
        sendMessage: function () {
            socket.emit("message", this.message);
            this.message = "";
        },
        setUsername: function () {
            socket.emit("join", this.username);
            this.username = "";
            this.state = 1;
        },
        continueWithoutUsername: function () {
            socket.emit("join", null),
            this.state = 1;
        }
    },
    created: function () {
        socket = io();
    },
    mounted: function () {
        socket.on("message", function (message) {
            app.messages.push(message);
            app.$nextTick(function () {
                var messageBox = document.getElementById("chatbox");
                messageBox.scrollTop = messageBox.scrollHeight;
            })
        })
    }

});

/* ---------- Chat from chat.js file */
// const express = require("express")
// const appTwo = express()
// const http = require("http").Server(appTwo)
// const io = require("socket.io")(http)

// appTwo.use("/style", express.static(__dirname + "/style"))
// appTwo.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// io.on("connection", (socket) => {
//     socket.username = "anonymous"
//     socket.on("message", (msg) => io.emit("message", { "user": socket.username, "message": msg }))
//     socket.on("join", (username) => {
//         if (username != null) {
//             socket.username = username
//         }
//         socket.broadcast.emit("message", { user: "Server", "message": socket.username + " has joined the server!"})
//     })
// })

// http.listen(3000, () => console.log("Listening on port 3000!"))
/* ---------- End of Chat ---------- */
});