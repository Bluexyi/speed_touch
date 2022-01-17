<?php
session_start ();
$pseudo = strtolower((htmlspecialchars($_COOKIE['pseudo'])));
$score = htmlspecialchars($_COOKIE['score']);

// on teste si nos variables sont définies
if (!empty($_COOKIE['pseudo']) && !empty($_COOKIE['score'])) {
    try{
        $pdo = new PDO('sqlite:'.dirname(__FILE__).'/speedtouch.db');
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // ERRMODE_WARNING | ERRMODE_EXCEPTION | ERRMODE_SILENT
    } catch(Exception $e) {
        echo "Impossible d'accéder à la base de données SQLite : ".$e->getMessage();
        die();
    }

    $datetime = date("Y-m-d H:i:s");
    $stmt = $pdo->prepare("INSERT INTO scores (pseudo, score, created_at) VALUES (:pseudo, :score, :createdAt)");
    $stmt->bindParam(':pseudo', $pseudo);
    $stmt->bindParam(':score', $score);
    $stmt->bindParam(':createdAt', $datetime);
    $stmt->execute();

    $stmt->close();
    $pdo->close();

    header ('location: ./index.php');
} else {
    header ('location: ./index.php');
}
?>