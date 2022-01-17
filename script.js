let score = 0;
let scoreElt = document.getElementById('score');
let comboElt = document.getElementById('combo');
const startbtn = document.getElementById('startBtn');
const inputName = document.getElementById('pseudo');
scoreElt.innerText = score;
let gameFinish = false;
let combo = 0
let canStart = false;
let pseudo = "none";

let good_input = new Audio('./sounds/good_input2.wav');
let bad_input = new Audio('./sounds/bad_input2.wav');
let ambiance = new Audio('./sounds/16bit_mix.wav');

inputName.addEventListener('input', function () {
    if (this.value.length < 4) {
        if (canStart == true) {
            startbtn.className = "btnStartDisable";
        }
        return canStart = false; // keep form from submitting
    } else {
        if (canStart == false) {
            startbtn.classList.remove("btnStartDisable");
        }
        return canStart = true;
    }
    //TODO: faire en sorte qu'on puisse appuyer sur start uniquement si prenom conforme et recuerer noms saisie
});

currentIdInput = 0;

const touchs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let touchActives = []
for (const touch of touchs) {
    touchActives.push(0);
}

let virtualKeyboard = document.getElementById('virtualKeyboard');

for (let i = 0; i < touchs.length; i++) {
    let div = document.createElement("div");
    div.className = "touch";
    div.id = i;
    let p = document.createElement("p");
    p.innerText = touchs[i];
    div.appendChild(p);
    virtualKeyboard.appendChild(div);
}

function activeTouch() {
    if (!touchActives.includes(1)) {
        let touchSize = touchs.length - 1;
        let random = Math.floor(Math.random() * (touchSize - 0 + 1) + 0)
        while (random == currentIdInput) {
            random = Math.floor(Math.random() * (touchSize - 0 + 1) + 0);
        }
        if (touchActives[random] != 1) {
            touchActives[random] = 1;
            currentIdInput = random;
            let touch = document.getElementById(random);
            touch.classList.add("active");
        }
    }
}

// ------ KEYBOARD ------ 
const keyboard = {};

window.onkeydown = function (e) {
    keyboard[e.key] = true;
};

window.onkeyup = function (e) {
    delete keyboard[e.key];
};

function activeInput() {
    for (const touch of touchs) {
        document.addEventListener('keyup', (e) => {
            if (e.key == touch || e.key == touch.toLowerCase() && !gameFinish) {
                update(touch);
            }
        });
    }
}

function checkInput(input) {
    let idInput = touchs.indexOf(input);
    if (touchActives[idInput] == 1) {
        good_input.play();
        score += 10 * (1 + combo / 10);
        combo++;
        touchActives[idInput] = 0;
        let element = document.getElementById(idInput);
        element.classList.remove("active");
    } else {
        bad_input.play();
        if (score > 0) {
            score -= 10;
            combo = 0
        }
    }
}

function updateScoreCombo() {
    scoreElt.innerText = score;
    comboElt.innerText = combo;
}

function startTimer(timer, display) {
    let interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (timer == 0) {
            gameFinish = true;
            gameEnd();
            clearInterval(interval);
        }

        timer--;

    }, 1000);
}

startbtn.addEventListener("click", () => {
    if (canStart) {
        const notStart = document.getElementById('notStart');
        notStart.remove()
        ambiance.play();
        let maxTime = 3 * 1,
            display = document.querySelector('#time');
        startTimer(maxTime, display);
        activeInput();
        activeTouch();
    }

    //Todo ajouter nom ici demain
});

function update(input) {
    checkInput(input);
    updateScoreCombo();
    activeTouch();
}

function createCookie(name, value) {
    let expires = new Date();
    expires.setTime(expires.getTime() + (10 * 1000)); //10secondes
    console.log(name + "=" + value + "; expires=" + expires + "path=/; SameSite=Lax");
    document.cookie = name + "=" + value + "; expires=" + expires + "path=/; SameSite=Lax";
}

function gameEnd() {
    let element = document.getElementById(currentIdInput);
    element.classList.remove("active");
    ambiance.pause();

    let divEnd = document.createElement("div");
    divEnd.className = "end";

    let pTxtScore = document.createElement("p");
    if (score > 0) {
        pTxtScore.innerText = "Tu as fait un score de " + score + " points !";
    } else {
        pTxtScore.innerText = "Aie, tu as un score de " + score + " points..";
    }
    pTxtScore.className = "msgScore";

    divEnd.appendChild(pTxtScore);

    let divBtnRetry = document.createElement("div");
    divBtnRetry.id = "retryBtn";
    let pTxtBtnRetry = document.createElement("p");
    pTxtBtnRetry.innerText = "REJOUER";
    divBtnRetry.appendChild(pTxtBtnRetry);

    divEnd.appendChild(divBtnRetry);

    document.body.appendChild(divEnd)

    divBtnRetry.addEventListener("click", () => {
        window.location.href = "./traitement.php";
        //window.location.reload();
    });

    createCookie('pseudo', 'roro');
    createCookie('score', score);
}
