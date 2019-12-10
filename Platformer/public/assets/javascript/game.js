/* game logic written by Chris Mangin
  debugged by Jake, Chris, Kevin */

/* theme song written and recorded by Chris
  sprite animations and jump sound by Kevin */



// getting canvas element from HTML

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var collided = false;

// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "assets/images/dino1.png";
bg.src = "assets/images/ozp.gif";
fg.src = "assets/images/fg.png";
pipeNorth.src = "assets/images/satellite.png";
pipeSouth.src = "assets/images/satellite.png";

// gap between north and south objects (randomizes each game)

var gap = Math.floor(Math.random() * (150 - 100) + 100);
var constant;

//player object coordinates

var bX = 10;
var bY = 150;

// Affects fall speed/jump height

var gravity = 0;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();
var gameTheme = new Audio();
var gameEnd = new Audio();

fly.src = "assets/sounds/flap.mp3";
scor.src = "assets/sounds/scoreup.wav";
gameTheme.src = "assets/sounds/theme.wav";
gameEnd.src = "assets/sounds/gameover.wav";

// on key down

document.addEventListener("keydown", moveUp);

// user must press up arrow key to fly (character code 38)

function moveUp(event) {
  var x = event.keyCode;
  if (x == 38) {
    gravity = 1.5;
    bY -= 35;
    fly.play();
    gameTheme.play();
    gameTheme.loop();
  }
}

// pipe coordinates

var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

// draw images

function draw() {

  // draws background image/transparent layer
bg.onload = function () {
  ctx.drawImage(bg, 0, 0, 650, 512);
}
ctx.clearRect(0, 0, 650, 512);
  

  // for loop to draw pipe positions

  for (var i = 0; i < pipe.length; i++) {
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    // ensures pipes move towards player object

    pipe[i].x--;

    // if pipe reaches halfway point on canvas, load next pipe outside of canvas

    if (pipe[i].x == cvs.width - 325) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // collision detection --Bug fixed by Kevin--

    if (
      ((bX + bird.width >= pipe[i].x &&
          bX <= pipe[i].x + pipeNorth.width &&
          (bY <= pipe[i].y + pipeNorth.height ||
            bY + bird.height >= pipe[i].y + constant)) ||
        bY + bird.height >= cvs.height) && !collided
    ) {
      collided = true;
      // If collided, post player name and score to leaderboards database
      gameEnd.play();
      $.ajax({
        method: "POST",
        url: "/api/leaderboards",
        data: {
          player: $("#player").val(),
          score: score
        }
      }).done(function () {
        location.reload(); // reload the page
      })
    }

    // if pipes move past player object, increment point val

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }
  }

// draws player object

ctx.drawImage(bird, bX, bY);

  bY += gravity;

  // displays player data

  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Verdana";
  ctx.fillText("Player : " + $("#player").val(), 10, cvs.height - 40);
  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  // callback function to update animation before next repaint

  requestAnimationFrame(draw);
}

// on click hides user form, game start

$("#start").on("click", function () {
  $("#userInput").hide();
  draw();

})