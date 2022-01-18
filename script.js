let scoreElt = document.getElementById('score');
let comboElt = document.getElementById('combo');
const startbtn = document.getElementById('startBtn');
const inputName = document.getElementById('pseudo');
const pointDisplay = document.getElementById('point');
let gameFinish = false;
let canStart = false;
let pseudo = "none";
let score = 0;
let combo = 0;
let maxTime = 90 * 1;

let good_input = new Audio('./sounds/good_input2.wav');
let bad_input = new Audio('./sounds/bad_input2.wav');
let end_explosion = new Audio('./sounds/16bit_Explosion.mp3');
let ambiance = null;

scoreElt.innerText = score;
inputName.value = "";

pointDisplay.innerHTML = "+00";
pointDisplay.style.color = "transparent";

audioId = Math.floor(Math.random() * (2 - 0)) + 0;
if(audioId == 0){
    ambiance = new Audio('./sounds/TopGear.mp3');
}else if (audioId == 1) {
    ambiance = new Audio('./sounds/BigBlue.mp3');
}
else{
    ambiance = new Audio('./sounds/TopGear.mp3');
}

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

if(window.mobileCheck()){
    alert("ATTENTION, un clavier physique est nécéssaire pour jouer!");
}

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

function displayPoint(point){
    if(point < 0){
        pointDisplay.style.color = "#ff1414";
        pointDisplay.innerHTML = point;
    }else{
        pointDisplay.style.color = "#14ff33";
        pointDisplay.innerHTML = "+" + point;
    }
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
        displayPoint(10 * (1 + combo / 10));
        score += 10 * (1 + combo / 10);
        combo++;
        touchActives[idInput] = 0;
        let element = document.getElementById(idInput);
        element.classList.remove("active");
    } else {
        bad_input.play();
        error(idInput);
        if (score > 0) {
            displayPoint(-50);
            if (score > 50){
                score -= 50;
            }else{
                score = 0;
            }
            
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

function error(idInput){
    let delayInMilliseconds = 100;
    let inputError = document.getElementById(idInput);

    virtualKeyboard.classList.add("keyBoardError");
    inputError.classList.add("touchError");

    setTimeout(function() {
        virtualKeyboard.classList.remove("keyBoardError");
        inputError.classList.remove("touchError");
    }, delayInMilliseconds);
    
}

function activeBgAnimation(){
    document.body.className = "bgAnim";
}

startbtn.addEventListener("click", () => {
    if (canStart) {
        pseudo = inputName.value;
        const notStart = document.getElementById('notStart');
        notStart.remove();
        ambiance.play();

        display = document.querySelector('#time');

        startTimer(maxTime, display);
        activeBgAnimation();
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
