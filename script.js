let scoreElt = document.getElementById('score');
let comboElt = document.getElementById('combo');
const startbtn = document.getElementById('startBtn');
const inputName = document.getElementById('pseudo');
let gameFinish = false;
let canStart = false;
let pseudo = "none";
let score = 0;
let combo = 0

let good_input = new Audio('./sounds/good_input2.wav');
let bad_input = new Audio('./sounds/bad_input2.wav');
let end_explosion = new Audio('./sounds/16bit_Explosion.mp3');
let ambiance = null;

audioId = Math.floor(Math.random() * (2 - 0)) + 0;
if(audioId == 0){
    ambiance = new Audio('./sounds/TopGear.mp3');
}else if (audioId == 1) {
    ambiance = new Audio('./sounds/BigBlue.mp3');
}
else{
    ambiance = new Audio('./sounds/TopGear.mp3');
}

scoreElt.innerText = score;
inputName.value = "";

inputName.addEventListener('input', function () {
    if (this.value.length < 3) {
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
        pseudo = inputName.value;
        const notStart = document.getElementById('notStart');
        notStart.remove();
        ambiance.play();
        let maxTime = 90 * 1;
        display = document.querySelector('#time');
        startTimer(maxTime, display);
        activeInput();
        activeTouch();
    }
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
    ambiance.pause();
    end_explosion.play();

    let element = document.getElementById(currentIdInput);
    element.classList.remove("active");
    
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

    let divBtnSave = document.createElement("div");
    divBtnSave.id = "saveBtn";
    divBtnSave.className = "retryBtn";
    let pTxtBtnSave = document.createElement("p");
    pTxtBtnSave.innerText = "SAUVEGARDER TON SCORE";
    divBtnSave.appendChild(pTxtBtnSave);
    divEnd.appendChild(divBtnSave);

    let divBtnNotSave = document.createElement("div");
    divBtnNotSave.id = "notSaveBtn";
    divBtnNotSave.className = "retryBtn";
    let pTxtBtnNotSave = document.createElement("p");
    pTxtBtnNotSave.innerText = "NE PAS SAUVEGARDER TON SCORE";
    divBtnNotSave.appendChild(pTxtBtnNotSave);
    divEnd.appendChild(divBtnNotSave);

    document.body.appendChild(divEnd)

    divBtnSave.addEventListener("click", () => {
        createCookie('pseudo', pseudo);
        createCookie('score', score);
        window.location.href = "./traitement.php";
    });

    divBtnNotSave.addEventListener("click", () => {
        window.location.reload();
    });
}
