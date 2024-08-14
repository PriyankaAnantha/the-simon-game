// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store the game pattern and user's clicked pattern
var gamePattern = [];
var userClickedPattern = [];

// Variables to track game state
var started = false;
var level = 0;

// Function to start or restart the game
function startGame() {
    if (!started) {
        started = true;
        nextSequence();
    } else {
        // Trigger game over sequence if the game is already started
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Alas! GameOver! Restart!");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

       
        startOver();
    }
}

// Event listener for key press to start or restart the game
$(document).keypress(function() {
    startGame();
});

// Event listener for button click to start or restart the game
$("#start-button").click(function() {
    startGame();
});

// Event listener for color button clicks
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

// Function to check if the user's pattern is correct
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over! Press Any Key or Start Button to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// Function to generate the next color in the game pattern
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Function to animate button press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Function to play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Modal functionality
var modal = document.getElementById("game-description-modal");
var btn = document.getElementById("description-btn");
var span = document.getElementsByClassName("close-btn")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// logic of the game
// 1. The game will start with the level 0 and the level title will be "Level 0".   
// 2. The game will generate a random color and play the sound for that color.
// 3. The player will have to click on the button with the same color as the one shown by the game.
// 4. If the player clicks the correct color, the game will generate another random color and play the sound for that color.
// 5. The player will have to remember the sequence of colors and click on the buttons in the same sequence.
// 6. If the player clicks the wrong color, the game will play the wrong sound and the game will be over.
// 7. The player can restart the game by pressing any key after the game is over.
// 8. The game will keep track of the level and update the level title accordingly.
// 9. The game will keep track of the game pattern and the player's clicked pattern.
// 10. The game will check if the player's clicked pattern matches the game pattern at each level.
// 11. If the player completes the game pattern for a level, the game will proceed to the next level.
// 12. The game will keep track of the game state to prevent multiple key presses to start the game.
// 13. The game will play the sound and animate the button press when the player clicks a button.
// 14. The game will restart the game when the player clicks the wrong color.
// 15. The game will show a game over message and play the wrong sound when the player clicks the wrong color.
// 16. The game will restart the game when the player presses any key after the game is over.


