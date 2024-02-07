const inputs = document.querySelector(".inputs");
const resetButton = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector(".typing-input");
let word;
let maxGuesses;
let correctLetters = [];
let incorrectLetters = [];

function randomWord() {
    let randomObject = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomObject.word;
    maxGuesses = 8;
    correctLetters = [];
    incorrectLetters = [];
    hint.innerText = randomObject.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    console.log(word);

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}

randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if (
        key.match(/^[A-Za-z]+$/) &&
        !incorrectLetters.includes(` ${key}`) &&
        !correctLetters.includes(key)
    ) {
        if (word.includes(key)) {
            //if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                // showing matched letter in the input value
                if (word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    wrongLetter.innerText = incorrectLetters;
    typingInput.value = "";

    setTimeout(() => {
        if (correctLetters.length == word.length) {
            alert("Congrats! You found the word");
        } else if (maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses.");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
        200;
    });
}

resetButton.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());