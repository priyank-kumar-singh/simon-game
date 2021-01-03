var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

document.addEventListener("keypress", function(event) {
    if (!start) {
        start = true;
        nextSequence();
    }
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animate(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        console.log('success');
    } else {
        console.log('wrong');
        playSound('wrong');
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    ++level;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animate(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animate(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function startOver() {
    start = false;
    level = 0;
    gamePattern = [];
}

//Code with Javascript
// for (var i=0 ; i<4 ; ++i) {
//     document.querySelectorAll(".btn")[i].addEventListener("click", function () {
//         var userChosenColor = this.getAttribute("id");
//         userClickedPattern.push(userChosenColor);
//            playSound(userChosenColor);
//            animate(userChosenColor);        
//     });
// }    