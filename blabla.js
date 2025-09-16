const textdisplay = document.getElementById("textDisplay");
const textinput = document.getElementById("textInput");
const timerS = document.getElementById("timer");
const wpmS = document.getElementById("wpm");
const accuracyS = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");

let timer = 0;
let interval = null;
let startTime = null;
let isRunning = false;
let currentText = "";

const texts = [
  "javascript is so not fun",
  "why is javascript so annoying",
  "a note was pinned to the board",
  "a breeze came through the window",
  "clouds moved across the sky"
];
// this is for starting the test it uses mathfloor to round the number so it doesnt show 
// decimals and stuff it took me so MUCH TO FIGURE THIS OUTTTTT I HATE JAVASCRIPT
// also it has the timer which also always start at zero because duh
function starttest() {
  currentText = texts[Math.floor(Math.random() * texts.length)];
  textdisplay.innerHTML = "";
  currentText.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    textdisplay.appendChild(span);
  });

  textinput.value = "";
  textinput.disabled = false;
  textinput.focus();

  timer = 0;
  timerS.innerText = timer;
  wpmS.innerText = 0;
  accuracyS.innerText = 0;

  if (interval) clearInterval(interval);
  interval = null;
  startTime = null;
  isRunning = false;
}
// pretty self explanatory it start when you type and adds a second each second -_- the plus plus is like add 1 every second
function starttimer() {
  if (!isRunning) {
    startTime = new Date();
    interval = setInterval(() => {
      timer++;
      timerS.innerText = timer;
    }, 1000);
    isRunning = true;
  }
}
// this calculates the results it also has a logic inside of it i dont exactly know how to phrase it
// but it basically checks if the typed text is correct and then it calculates the accuracy and wpm
// and then it shows it on the screen
function calculateresults() {
  clearInterval(interval);
  textinput.disabled = true;

  const typedText = textinput.value;
  const correctChars = typedText.split("").filter((char, i) => char === currentText[i]).length;
  const accuracy = Math.round((correctChars / currentText.length) * 100);

  const timeTaken = (new Date() - startTime) / 1000 / 60; 
  const wordsTyped = typedText.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / timeTaken);

  accuracyS.innerText = isNaN(accuracy) ? 0 : accuracy;
  wpmS.innerText = isNaN(wpm) ? 0 : wpm;
  playRainingTacoSong(wpm);
// checkWordpermin(wpm);
}

textinput.addEventListener("input", () => {
  starttimer();

  const typedText = textinput.value.split("");
  const spans = textdisplay.querySelectorAll("span");

  let correct = true;
  spans.forEach((span, i) => {
    const char = typedText[i];
    if (char == null) {
      span.classList.remove("correct", "incorrect");
      correct = false;
    } else if (char === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
      correct = false;
    }
  });

  if (correct && typedText.length === currentText.length) {
    calculateresults();
  }
});


startBtn.addEventListener("click", starttest);

const emoji = ['🌮','🥩','🥬','🍅']
function createEmoji() {
  const e = document.createElement("div");
  e.className = "emoji";
  e.innerText = emoji[Math.floor(Math.random() * emoji.length)];
  e.style.left = Math.random() * 100 + "vw";
  e.style.top = "-30vh";
  document.body.appendChild(e);
  setTimeout(() =>
    e.remove()
  , 5000);

}

// function playRainingTacoSong() { 
//   const audio = document.getElementById("tacosong");
//   audio.play();
// }

//  function checkWordpermin(wpm) {
//   
//     playRainingTacoSong();
//     
//     setTimeout(() => clearInterval(tacoInterval), 5000); 
//   }
  



// function checkWordpermin(wpm) {
//   if (wpm >= 50) {
//   const audio = document.getElementById("tacosong");
//   audio.play();
//   setTimeout(() => {
//     clearInterval(tacoInterval);
//     audio.pause();           
//     audio.currentTime = 0;   
//   }, 5000); 
// }

// // console.log("it should work right?");
// // }
// function checkWordpermin(wpm) {
//   if (wpm >= 50) {
//     const audio = document.getElementById("tacosong");
//     audio.currentTime = 0; 
//     audio.play();


//     const tacoInterval = setInterval(createEmoji, 200);


//     setTimeout(() => {
//       clearInterval(tacoInterval);
//       audio.pause();
//       audio.currentTime = 0; 
//     }, 10000);
//   }


function playAudio() {
  const audio = document.getElementById("tacosong");
  audio.play();
   audio.currentTime = 28;
}

function playRainingTacoSong (wpm) {
  if (wpm >= 50) { 
   
    playAudio();
    const tacoInterval = setInterval(createEmoji, 200);

    setTimeout(() => clearInterval(tacoInterval), 5000);

    setTimeout(() => {
      const audio = document.getElementById("tacosong");
      if (audio) {
        audio.pause();
       
      }
    }, 10000);
  }
}





  // I HATE JAVASCRIPT SO MUCH IT TOOK ME 5 HOURS TO FIGURE OUT THAT I NEEDED TO CALL THE FUNCTION
// i thought math would end after school T_T
// i am also learning git hub and how to use it
// this was supervised by a teacher (My brother he is pretty cool)



