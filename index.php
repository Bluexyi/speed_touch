<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Speed Touch</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>

    <div id="notStart">
		<div id="scores">
            <h2>Tableau des scores</h2>
            <div id="listScores">
                <?php include("./recupereListeScore.php") ?>
            </div>
        </div>

        <input type="text" id="pseudo" name="pseudo" required minlength="3" maxlength="15" size="40" placeholder="Comment t'appelles tu?">
        
        <div id=startBtn class="btnStartDisable">
            <p>START</p>
        </div>

        <p class="regle">
            Test ta maîtrise du clavier ! <br><br>
            
            Des lettres vont s'illuminer en <span class="green">vert</span>, <br>
            Appuie sur la touche correspondante de ton clavier pour gagner 10points.<br>
            Fais des séries de bonnes lettres et tu augmenteras ton combo ! <br>
            Augmenter ton combo ajoutera un coefficient multiplicateur aux points que tu gagnes, génial non? <br>
            Attention, si tu appuie sur une mauvaise lettre, tu perdras 10 points et ton combo sera remis à 0..<br><br>
            
            Tu as <span class="bold">1 minute et 30 seconds</span> pour exploser le score ! <br>
            A toi de jouer !
        </p>
    </div>

    <h1>Speed Touch</h1>
    
    <div id="virtualKeyboard"></div>
    <div class="info">
        <p class="timer">Timer : <span id="time">01:30</span></p>
        <p class="scoreDisplay">Score : <span id="score">0</span></p>
        <p class="combo">Combo : <span id="combo">0</span></p>
    </div>
    
</body>
</html>