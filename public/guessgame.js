"use-strict";

// INPUT ON FOCUS ON PAGE LOAD
document.querySelector(".guess").focus();

const message = document.querySelector(".message");

let score = 30; // ;

let highscore = JSON.parse(localStorage.getItem("highscore")) || 0;
document.querySelector(".highscore").textContent = highscore;

let timeScore = localStorage.getItem("timeScore") || 0;
document.getElementById("timeScore").textContent = `0:${timeScore}s`;

let wins = 0;
let losses = 0;

document.querySelector(".again").textContent = "Again!";

// RESET BUTTON
const reset = document
  .querySelector(".reset")
  .addEventListener("click", function () {
    highscore = 0;
    document.querySelector(".highscore").textContent = highscore;

    wins = 0;
    document.querySelector(".wins").textContent = wins;

    losses = 0;
    document.querySelector(".losses").textContent = losses;

    document.getElementById("timeScore").textContent = `0:00`;
    console.log("time reset");
  });

document.getElementById("gameMaster").style.display = "none";

// RANDOM NUMBER GENARATOR
let randomNumber = Math.trunc(Math.random() * 50) + 1;

let number = document.querySelector(".number");

let guess = document.querySelector(".guess").value;

const checkBtn = document.querySelector(".check");

// MESSAGE DISPLAY
const displayMessage = function (msg) {
  message.textContent = msg;
};

const time = document.getElementById("timer");

let warningAudio = document.getElementById("warningAudio");

let timer = 60;
let countdown;

document.getElementById("timer").innerText = timer;

// TIME COUNTDOWN
function startTime() {
  countdown = setInterval(function () {
    timer--;
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    document.getElementById("timer").innerText =
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    // WARNING SOUND
    if (timer <= 10) {
      warningAudio.play();
    }

    // GAME LOST
    if (timer <= 0 && wins !== 5) {
      clearInterval(countdown);
      displayMessage("💥 You lost the game!");
      // message.textContent = "💥 You lost the game!";

      warningAudio.pause();
      let overAudio = document.getElementById("overAudio");
      overAudio.play();
      document.querySelector(".score").textContent = score;
      document.body.style.backgroundColor = "#FF0000";
      document.querySelector(".guess").disabled = true;
      checkBtn.disabled = true;

      document.querySelector(".again").textContent = "Start Over";
    }
  }, 1000);
}

// CALLING THE TIME COUNTDOWN FUNCTION
startTime();

// CHECK BUTTON

document
  .querySelector(".confettiButton")
  .addEventListener("click", function () {
    // Trigger confetti explosion
    let shouldCelebrate = true;
  });

function check() {
  guess = Number(document.querySelector(".guess").value);

  //GUESS VALIDATIONS
  if (!guess) {
    let errorAudio = document.getElementById("errorAudio");
    errorAudio.play();
    displayMessage("⛔ No Number");
    // message.textContent = "⛔ No Number";
  } else if (guess === randomNumber) {
    displayMessage("🎉 Correct Number!");
    // message.textContent = "🎉 Correct Number!";
    document.body.style.backgroundColor = "#60b347";
    number.style.width = "7rem";
    number.style.fontSize = "28px";
    number.textContent = randomNumber;
    wins++;
    document.querySelector(".wins").textContent = wins;
    let winAudio = document.getElementById("winAudio");
    winAudio.play();
    document.querySelector(".guess").disabled = true;
    checkBtn.disabled = true;
    // if (score > highscore) {
    //   highscore = score;
    //   document.querySelector(".highscore").textContent = highscore;
    //   // } else if (timer > timeScore && wins === 3) {
    //   //   timeScore = timer;
    //   //   document.getElementById("timeScore").innerText = `0:${timeScore}s`;
    //   //   console.log(timer);
    // }
    if (guess === randomNumber && timer > 0 && wins === 3) {
      document.getElementById("gameMaster").style.display = "block";
      document.getElementById("gameMaster").classList.add("beat-text");

      // document.querySelector(".check").classList.add("confettiButton");

      confetti();

      clearInterval(countdown);
      if (timer > timeScore || score > highscore) {
        timeScore = timer;
        localStorage.setItem("timeScore", timeScore);
        document.getElementById("timeScore").textContent = `0:${timeScore}s`;
        highscore = score;
        localStorage.setItem("highscore", JSON.stringify(highscore));
        document.querySelector(".highscore").textContent = highscore;
      }
      warningAudio.pause();
      winAudio.pause();
      let victoryAudio = document.getElementById("victoryAudio");
      victoryAudio.play();
      document.querySelector(".again").textContent = "Start Over";
    }
  } else if (guess !== randomNumber) {
    losses++;
    setTimeout(function () {
      document.querySelector(".guess").value = "";
    }, 500);
    document.querySelector(".guess").focus();
    document.querySelector(".losses").textContent = losses;
    let errorAudio = document.getElementById("errorAudio");
    errorAudio.play();
    if (score > 1) {
      displayMessage(guess > randomNumber ? "📈 Too High" : "📉 Too Low");
      // message.textContent =
      //   guess > randomNumber ? "📈 Too High" : "📉 Too Low";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("💥 You lost the game!");
      // message.textContent = "💥 You lost the game!";
      let overAudio = document.getElementById("overAudio");
      overAudio.play();
      document.querySelector(".score").textContent = 0;
      document.body.style.backgroundColor = "#FF0000";
      document.querySelector(".guess").disabled = true;
      checkBtn.disabled = true;
      document.getElementById("gameMaster").style.display = "none";
      clearInterval(countdown);
      if (timer > timeScore && score > highscore) {
        timeScore = timer;
        document.getElementById("timeScore").textContent = `0:${timeScore}s`;
        highscore = score;
        document.querySelector(".highscore").textContent = highscore;
      }
    }
  }
}

// AGAIN BUTTON FUNCTIONALITY
const againBtn = document
  .querySelector(".again")
  .addEventListener("click", function () {
    randomNumber = Math.trunc(Math.random() * 50) + 1;
    console.log(randomNumber);
    document.querySelector(".guess").disabled = false;
    document.querySelector(".guess").focus();
    checkBtn.disabled = false;
    document.querySelector(".guess").value = "";
    document.body.style.backgroundColor = "#222";
    number.style.width = "";

    number.textContent = "?";
    displayMessage("Start guessing...");
    //  message.textContent = "Start guessing...";

    // AGAIN BUTTON TO START THE TIME COUNTDOWN AGAIN
    if (
      timer <= 0 ||
      wins === 3 ||
      message.textContent === "💥 You lost the game!"
    ) {
      timer = 60;
      document.getElementById("timer").innerText = timer;
      clearInterval(countdown);
      startTime();

      document.getElementById("gameMaster").style.display = "none";
      document.querySelector(".again").textContent = "Again!";
      wins = 0;
      document.querySelector(".wins").textContent = wins;

      losses = 0;
      document.querySelector(".losses").textContent = losses;

      score = 30;
      document.querySelector(".score").textContent = score;
    }
  });
