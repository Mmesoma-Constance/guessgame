"use-strict";

const message = document.querySelector(".message");

let score = 20; // ;
let highscore = 0;

let wins = 0;
let losses = 0;

let randomNumber = Math.trunc(Math.random() * 20) + 1;

let number = document.querySelector(".number");

let guess = document.querySelector(".guess").value;

const checkBtn = document.querySelector(".check");

const displayMessage = function (msg) {
  message.textContent = msg;
};
const time = document.getElementById("timer");

let timer = 60;
let countdown;
document.getElementById("timer").innerText = timer;
function startTime() {
  countdown = setInterval(function () {
    timer--;
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    document.getElementById("timer").innerText =
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    if (timer <= 0 && wins !== 5) {
      clearInterval(countdown);
      displayMessage("💥 You lost the game!");
      // message.textContent = "💥 You lost the game!";
      let overAudio = document.getElementById("overAudio");
      overAudio.play();
      document.querySelector(".score").textContent = 0;
      document.body.style.backgroundColor = "#FF0000";
      document.querySelector(".guess").disabled = true;
      checkBtn.disabled = true;
    } else if (timer != 0 && wins !== 5) {
    }
  }, 1000);
}
//GAME MODE

// const rule = document.querySelector(".rule");
// const mode = document.querySelector(".mode");

// mode.style.height = "30px";
// mode.addEventListener("click", function () {
//   mode.style.height = "100px";

//   if (mode.textContent === "Easy") {
//     mode.innerText = "Medium";
//     rule.innerText = "(Between 1 and 50)";
//     console.log("medium");
//     randomNumber = Math.trunc(Math.random() * 50) + 1;
//   } else if (mode.textContent === "Medium") {
//     mode.innerText = "Hard";
//     rule.innerText = "(Between 1 and 100)";
//     randomNumber = Math.trunc(Math.random() * 100) + 1;
//   }
// });

// const modeEasy = document.querySelector(".modeEasy");
// const modeMedium = document.querySelector(".modeMedium");
// const modeHard = document.querySelector(".modeHard");

// modeEasy.addEventListener("dblclick", function () {
//   console.log("This is easy!");
//   mode.style.height = "30px";
// });

// CHECK BUTTON

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
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  } else if (guess !== randomNumber) {
    losses++;
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
    }
  }
}

//   else if (guess > randomNumber) {
//     if (score > 1) {
//       message.textContent = "📈 Too High";
//       score--;
//       document.querySelector(".score").textContent = score;
//     } else {
//       message.textContent = "💥 You lost the game!";
//       document.querySelector(".score").textContent = 0;
//     }
//   } else if (guess < randomNumber) {
//     if (score > 1) {
//       message.textContent = "📉 Too Low";
//       score--;
//       document.querySelector(".score").textContent = score;
//     } else {
//       message.textContent = "💥 You lost the game!";
//       document.querySelector(".score").textContent = 0;
//     }
//   }
// });

const reset = document
  .querySelector(".reset")
  .addEventListener("click", function () {
    highscore = 0;
    document.querySelector(".highscore").textContent = highscore;

    wins = 0;
    document.querySelector(".wins").textContent = wins;

    losses = 0;
    document.querySelector(".losses").textContent = losses;
  });

// Get the button and dropdown content elements
const button = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");
const messages = document.getElementById("messages");

// Add click event listener to the button
button.addEventListener("click", function () {
  // Toggle the visibility of the dropdown content
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
});

// Add click event listener to the dropdown options
dropdownContent.querySelectorAll("a").forEach(function (option) {
  option.addEventListener("click", function () {
    // Set the text of the button to the selected option
    button.textContent = option.textContent;
    // Hide the dropdown content after selecting an option
    dropdownContent.style.display = "none";
    const againButton = document.querySelector(".again");
    // Update the messages based on the selected difficulty level
    if (option.id === "easy") {
      messages.textContent = "(Between 1 and 20)";

      againButton.addEventListener("click", function () {
        randomNumber = Math.trunc(Math.random() * 20) + 1;
        console.log(randomNumber);
      });
    } else if (option.id === "medium") {
      messages.textContent = "(Between 1 and 50)";
      againButton.addEventListener("click", function () {
        randomNumber = Math.trunc(Math.random() * 50) + 1;
        console.log(randomNumber);
      });
    } else if (option.id === "hard") {
      messages.textContent = "(Between 1 and 100)";
      againButton.addEventListener("click", function () {
        randomNumber = Math.trunc(Math.random() * 100) + 1;
        console.log(randomNumber);
      });
      timer = 60;
      document.getElementById("timer").innerText = timer;
      clearInterval(countdown);
      startTime();
      randomNumber = Math.trunc(Math.random() * 100) + 1;
    }
  });
});

// AGAIN BUTTON
const againBtn = document
  .querySelector(".again")
  .addEventListener("click", function () {
    randomNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector(".guess").disabled = false;
    checkBtn.disabled = false;
    document.querySelector(".guess").value = "";
    document.body.style.backgroundColor = "#222";
    number.style.width = "";

    // if (option.id === "easy") {
    //   messages.textContent = "(Between 1 and 20)";
    // } else if (option.id === "medium") {
    //   messages.textContent = "(Between 1 and 50)";
    //   randomNumber = Math.trunc(Math.random() * 50) + 1;
    // } else if (option.id === "hard") {
    //   messages.textContent = "(Between 1 and 100)";
    //   timer = 60;
    //   document.getElementById("timer").innerText = timer;

    //   randomNumber = Math.trunc(Math.random() * 100) + 1;
    // }
    // if (guess !== randomNumber) {
    //   timer = 60;
    //   document.getElementById("timer").innerText = timer;
    //   clearInterval(countdown);
    //   startTime();
    //   console.log("time wont stop");
    // }

    number.textContent = "?";
    displayMessage("Start guessing...");
    //  message.textContent = "Start guessing...";
    score = 20;
    document.querySelector(".score").textContent = score;
  });
