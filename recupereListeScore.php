<?php
session_start();
try {
	$pdo = new PDO('sqlite:' . dirname(__FILE__) . '/speedtouch.db');
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // ERRMODE_WARNING | ERRMODE_EXCEPTION | ERRMODE_SILENT
} catch (Exception $e) {
	echo "Impossible d'accéder é la base de données SQLite : " . $e->getMessage();
	die();
}

$stmt = $pdo->query("SELECT pseudo, score FROM scores ORDER BY score DESC");

$pseudos = [];
$scores = [];

while ($res = $stmt->fetch()) {
	array_push($pseudos, $res['pseudo']);
	array_push($scores, $res['score']);
}


?>
<div class="columnScore pseudos">
	<?php

	for ($i = 0; $i <= sizeof($pseudos) - 1; $i++) {
	?>
		<p class="pseudo">
			<?php echo $pseudos[$i]; ?>
		</p>
	<?php
	}

	?>
</div>
<div class="columnScore scores">
	<?php

	for ($i = 0; $i <= sizeof($scores) - 1; $i++) {
	?>
		<p class="score">
			<?php echo $scores[$i]; ?>
		</p>
	<?php
	}
	?>
</div>